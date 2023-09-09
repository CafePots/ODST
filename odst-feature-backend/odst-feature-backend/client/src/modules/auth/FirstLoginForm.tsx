import React from 'react';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import { MSALUser, Organization, User } from '../common/types';


interface Props {
  readonly msalUser: MSALUser;
  readonly onComplete: (user: User) => void;
}

export default function FirstLoginForm(props: Props) {
  // State
  // -----

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState(props.msalUser.username);
  const [organization, setOrganization] = React.useState<string>('');
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [roles, setRoles] = React.useState<('SUBSCRIBER' | 'PUBLISHER')[]>([]);
  const [rank, setRank] = React.useState<string>('');


  const isValid = firstName !== ''
    && lastName !== ''
    && email.endsWith('.mil')
    && organization !== ''
    && roles.length !== 0
    && rank !== '';

  // Lifecycle
  // ---------

  React.useEffect(() => {
    fetch('http://localhost:8080/organizations')
      .then((response) => response.json())
      .then(setOrganizations)
      .catch((e) => e);
  }, []);


  // Functions
  // ---------

  const submitForm = React.useCallback(async () => {
    const createUserRequest = await fetch('http://localhost:8080/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msalUser: props.msalUser,
        additionalInfo: {
          firstName,
          lastName,
          email,
          organization,
          roles,
          rank,
        },
      }),
    });

    const user: User = await createUserRequest.json();

    props.onComplete(user);
  }, [props.msalUser, firstName, lastName, email, organization, roles, rank]);


  // View
  // ----

  return (
    <form style={{ fontFamily: 'Maven Pro' }} onSubmit={submitForm}>
      <h2>It looks like this is the first time you have logged in.</h2>
      <p>We will need some additional information before you can get started.</p>

      <div style={{ marginTop: '40px', width: '300px' }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '40px', width: '300px' }}>
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '40px', width: '300px' }}>
        <TextField
          type="email"
          label="DoD Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '40px', width: '300px' }}>
        <InputLabel id="organization">Organization</InputLabel>
        <Select
          labelId="organization"
          value={organization}
          label="Organization"
          style={{ width: '240px' }}
          onChange={(evt) => setOrganization(evt.target.value)}
        >
          {organizations.map((org) => (
            <MenuItem key={org.id} value={org.id}>{org.name}</MenuItem>
          ))}
        </Select>
      </div>

      <div style={{ marginTop: '40px', width: '300px' }}>
        <InputLabel id="role">Roles</InputLabel>
        <FormControlLabel
          label="Subscriber"
          control={(
            <Checkbox
              checked={roles.includes('SUBSCRIBER')}
              onChange={(evt) => {
                if (evt.target.checked) {
                  setRoles([...roles, 'SUBSCRIBER']);
                } else {
                  setRoles(roles.filter((x) => x !== 'SUBSCRIBER'));
                }
              }}
            />
          )}
        />
        <FormControlLabel
          label="Publisher"
          control={(
            <Checkbox
              checked={roles.includes('PUBLISHER')}
              onChange={(evt) => {
                if (evt.target.checked) {
                  setRoles([...roles, 'PUBLISHER']);
                } else {
                  setRoles(roles.filter((x) => x !== 'PUBLISHER'));
                }
              }}
            />
          )}
        />
      </div>

      <div style={{ marginTop: '40px', width: '300px' }}>
        <InputLabel id="rank">Rank</InputLabel>
        <Select
          labelId="rank"
          value={rank}
          label="Rank"
          style={{ width: '240px' }}
          onChange={(evt) => setRank(evt.target.value)}
        >
          <MenuItem value="PV2">PV2</MenuItem>
          <MenuItem value="PVT">PVT</MenuItem>
          <MenuItem value="PFC">PFC</MenuItem>
          <MenuItem value="SPC">SPC</MenuItem>
          <MenuItem value="CPL">CPL</MenuItem>
          <MenuItem value="SGT">SGT</MenuItem>
          <MenuItem value="SSG">SSG</MenuItem>
          <MenuItem value="SFC">SFC</MenuItem>
          <MenuItem value="MSG">MSG</MenuItem>
          <MenuItem value="1SG">1SG</MenuItem>
          <MenuItem value="SGM">SGM</MenuItem>
          <MenuItem value="CSM">CSM</MenuItem>
          <Divider />
          <MenuItem value="W01">W01</MenuItem>
          <MenuItem value="CW2">CW2</MenuItem>
          <MenuItem value="CW3">CW3</MenuItem>
          <MenuItem value="CW4">CW4</MenuItem>
          <MenuItem value="CW5">CW5</MenuItem>
          <Divider />
          <MenuItem value="2LT">2LT</MenuItem>
          <MenuItem value="1LT">1LT</MenuItem>
          <MenuItem value="CPT">CPT</MenuItem>
          <MenuItem value="MAJ">MAJ</MenuItem>
          <MenuItem value="LTC">LTC</MenuItem>
          <MenuItem value="COL">COL</MenuItem>
          <MenuItem value="BG">BG</MenuItem>
          <MenuItem value="MG">MG</MenuItem>
          <MenuItem value="LTG">LTG</MenuItem>
          <MenuItem value="GEN">GEN</MenuItem>
          <MenuItem value="GA">GA</MenuItem>
        </Select>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Button type="submit" variant="outlined" disabled={!isValid}>Submit</Button>
      </div>
    </form>
  );
}
