import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import findIndex from 'core-js/library/fn/array/find-index';

import { RepoQuery } from './repo.gql';
import { Observable } from 'rxjs';

import * as M from '../graphql/mutations';
import { DataProxy } from 'apollo-cache';

interface IUpdateTopicsInput {
  repositoryId: string;
  topicNames: string[];
  clientMutationId: string;
}

@Injectable()
export class RepoService {
  constructor(private apollo: Apollo) {}

  private repoQueryVariables: any;

  public getRepoByNameAndOwner(owner: string, name: string, first?: number): Observable<any> {
    this.repoQueryVariables = {
      owner,
      name,
      first
    };
    return this.apollo
      .watchQuery<any>({
        query: RepoQuery,
        variables: this.repoQueryVariables
      })
      .valueChanges.map((res: any) => {
        const { data, ...rest } = res;
        return { repository: data.repository, ...rest };
      });
  }

  public updateTopics(updateTopicsInput: IUpdateTopicsInput): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: M.updateTopics,
      variables: {
        input: updateTopicsInput
      },
      update: (proxy: DataProxy, mutationResult: FetchResult<any>) => {
        const {
          data: { updateTopics }
        } = mutationResult;
        if (!updateTopics.invalidTopicNames) {
          let nextNodes: any[];
          const data: any = proxy.readQuery({ query: RepoQuery, variables: this.repoQueryVariables });
          console.log('updateTopicsInput.topicNames: ', updateTopicsInput.topicNames);

          const {
            repository: { repositoryTopics }
          } = data;

          if (repositoryTopics.nodes.length > updateTopicsInput.topicNames.length) {
            nextNodes = repositoryTopics.nodes
              .map(node => {
                if (updateTopicsInput.topicNames.indexOf(node.topic.name) !== -1) {
                  return node;
                }
              })
              .filter(x => x);
          } else {
            nextNodes = updateTopicsInput.topicNames.map((topicName: string) => {
              const idx: number = findIndex(repositoryTopics.nodes, node => node.topic.name === topicName);
              const exist: boolean = idx !== -1;
              if (exist) {
                return repositoryTopics.nodes[idx];
              } else {
                return {
                  id: Math.random().toString(),
                  topic: {
                    id: Math.random().toString(),
                    name: topicName,
                    __typename: 'Topic'
                  },
                  __typename: 'RepositoryTopic'
                };
              }
            });
          }

          console.log('nextNodes: ', nextNodes);

          repositoryTopics.nodes = nextNodes;

          proxy.writeQuery({ query: RepoQuery, variables: this.repoQueryVariables, data });
        }
      }
    });
  }
}
