import { Box, styled } from '@mui/material';

import EmailIcon from '../../media/clarity_email-solid.svg';
import phoneIcon from '../../media/bxs_phone.svg';


const GrayBox = styled('div')({
  fontFamily: 'Maven Pro',
  background: '#D9D9D9',
  borderRadius: 10,
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '15px',
  marginBottom: '30px',
  marginLeft: '25px',
  marginRight: '10px',
});

const TabbedP = styled('p')({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '30px',
});

const LabelP = styled('p')({
  fontSize: '20px',
});

export default function Contact() {
  return (
    <Box>
      <GrayBox>
        <h2>Technical Support</h2>
        <LabelP>XVIII ABN Corps List DWC</LabelP>
        <TabbedP>
          <a href="mailto:usarmy.bragg.xviiith-abn-corps.list.dwc@army.mil">
            <img src={EmailIcon} alt="Email Icon" width={24} height={24} style={{ paddingRight: '5px' }} />
          </a>
          usarmy.bragg.xviiith-abn-corps.list.dwc@army.mil
        </TabbedP>
      </GrayBox>
      <GrayBox>
        <h2>Product Manager</h2>
        <LabelP>1LT Antoine Davis</LabelP>
        <TabbedP>
          <img src={phoneIcon} alt="Phone Icon" width={24} height={24} style={{ paddingRight: '5px' }} />
          (571) 313-9579
        </TabbedP>
        <TabbedP>
          <a href="mailto:antoine.a.davis.mil@army.mil">
            <img src={EmailIcon} alt="Email Icon" width={24} height={24} style={{ paddingRight: '5px' }} />
          </a>
          antoine.a.davis.mil@army.mil
        </TabbedP>
      </GrayBox>
      <GrayBox>
        <h2>Lead Software Engineer</h2>
        <LabelP>SPC Dustin Stiles</LabelP>
        <TabbedP>
          <a href="mailto:dustin.w.stiles2.mil@army.mil">
            <img src={EmailIcon} alt="Email Icon" width={24} height={24} style={{ paddingRight: '5px' }} />
          </a>
          dustin.w.stiles2.mil@army.mil
        </TabbedP>
      </GrayBox>
    </Box>
  );
}
