import gql from 'graphql-tag';

const ADS = gql`
  query {
    ads {
      ad_id
      ad_nme
      channel_id
      channel_nme
      channel {
        ... on GoogleChannel {
          channel_id
          channel_nme
          google_channel_dsc
          google_channel_keywords
        }

        ... on FacebookChannel {
          channel_id
          channel_nme
          facebook_channel_url
          facebook_channel_ad_text
          facebook_channel_media_type
        }

        ... on InstagramChannel {
          channel_id
          channel_nme
          instagram_channel_url
          instagram_channel_ad_text
          instagram_channel_media_type
        }
      }
    }
  }
`;

export { ADS };
