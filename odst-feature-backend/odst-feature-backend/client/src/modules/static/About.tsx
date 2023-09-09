import { Box, styled } from '@mui/material';


const TitleP = styled('p')({
  margin: '10px 20px',
  fontSize: '32px',
  fontWeight: 'bold',
  fontFamily: 'Maven Pro',
});

const ContentP = styled('p')({
  margin: '10px 20px',
  fontSize: '18px',
  overflowWrap: 'normal',
  fontFamily: 'Maven Pro',
});

const greyBoxStyle = {
  width: '90%',
  borderRadius: '10px',
  background: '#D9D9D9',
  margin: '30px',
  padding: '10px',
};

export default function About() {
  return (
    <Box sx={{ margin: '25px' }}>
      <Box sx={greyBoxStyle}>
        <ContentP>
          The Orders Dissemination and Subscription Tool streamlines the operations and
          tasking orders process and provides a central location for current and future
          operations at each echelon to monitor each step of the orders process.
        </ContentP>
      </Box>
      <Box sx={greyBoxStyle}>
        <TitleP>
          Publications
        </TitleP>
        <ContentP>
          Enables orders publication at each echelon and order status tracking.
        </ContentP>
        <ContentP>
          Publishing an order will distribute it to each organization currently subscribed to the
          publishing organization`s channel.
        </ContentP>
        <ContentP>
          The order status, either staffing, published, acknowledged, or actioned, is
          shared betwen the publisher and subscriber to streamline shared
          understanding. Each subscriber`s updates will reflect on the publication chart.
        </ContentP>
      </Box>
      <Box sx={greyBoxStyle}>
        <TitleP>
          Subscription
        </TitleP>
        <ContentP>
          Enables orders subscription at each echelon and order status tracking.
        </ContentP>
        <ContentP>
          Subscribing to a channel delivers each order published on that channel to the subscriber.
        </ContentP>
        <ContentP>
          The order status, either published, acknowledged, or actioned, is shared
          amongst all members of the subscribing orders team to streamline shared
          understanding. If one member acknowledges or actions an order, the change
          respresents the subscribing orders team`s status.
        </ContentP>
        <ContentP>
          The subscriber will not see a publisher`s order if it is in the staffing process. An
          order will only become visible to the subscriber after it is published, and only
          the publisher will have subscriber status visibility. Subscribers will not have
          visibility of other subscribers and their statuses.
        </ContentP>
      </Box>
    </Box>
  );
}
