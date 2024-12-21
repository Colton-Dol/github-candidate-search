import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
//import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any>({});

  let i = 0;

  const save = () => {
    const savedCandidates = localStorage.getItem('candidates');

    if (savedCandidates) {
    const savedCandidatesArray = JSON.parse(savedCandidates as string);
    savedCandidatesArray.push(candidate);
    localStorage.setItem('candidates', JSON.stringify(savedCandidatesArray));
    } else {
      localStorage.setItem('candidates', `[${JSON.stringify(candidate)}]`);
    }
  }

  useEffect(() => {
    searchGithub().then(data => {
     searchGithubUser(data[i].login)
     .then(user => {
      console.log(user);

      const profile = {
        avatar: user.avatar_url,
        name: `${user.name || ''}(${user.login || ''})`,
        location: user.location,
        email: user.email,
        company: user.company,
        bio: user.bio
      }
      
      setCandidate(profile);
     })
    })
  }, [i])

  return (
    <div>
      <h1>Candidate Search</h1>
        <div style={{backgroundColor: 'black', borderRadius: 1}}>
          <img src={candidate.avatar}/>
          <div style={{marginLeft: 15}}>
            <h4>{candidate.name}</h4>
            <p>Location: {candidate.location || 'Not Found'}</p>
            <p>Email: {candidate.email || 'Not Found'}</p>
            <p>Company: {candidate.company || 'Not Found'}</p>
            <p>Bio: {candidate.bio || 'Not Found'}</p>
          </div>
        </div>
      <button onClick={save}>Save</button>
    </div>
  );
};

export default CandidateSearch;
