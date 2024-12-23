import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({
    id: 0,
    avatar_url: '',
    username: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: ''
  });
  const [saved, setSaved] = useState<any[]>([{}]);
  const [index, setIndex] = useState<number>(0);

  const display = () => {
    return (
      <div style={{backgroundColor: 'black', borderRadius: 25}}>
          <img src={candidate.avatar_url}/>
          <div style={{marginLeft: 15}}>
            <h2>{candidate.name}({candidate.username})</h2>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <p>Bio: {candidate.bio}</p>
          </div>
      </div>
    )
  }

  const save = () => {
    const savedCandidates = localStorage.getItem('candidates');

    if (savedCandidates) {
      const savedCandidatesArray = JSON.parse(savedCandidates as string);
      savedCandidatesArray.push(candidate);
      localStorage.setItem('candidates', JSON.stringify(savedCandidatesArray));
    } else {
      localStorage.setItem('candidates', `[${JSON.stringify(candidate)}]`);
    }

    setIndex(index + 1);
  }

  const next = () => {
    setIndex(index + 1);
  }

  useEffect(() => {
    searchGithub().then((data) => {
      setSaved(data)
      console.log(data)
    });
  }, [])

  useEffect(() => {
    searchGithubUser(saved[index].login).then((user) => {
      setCandidate({
        id: user.id,
        avatar_url: user.avatar_url,
        name: user.name || '',
        username: user.login,
        location: user.location || 'N/A',
        email: user.email || 'N/A',
        company: user.company || 'N/A',
        bio: user.bio || 'N/A'
      });
    })
  }, [index])

  console.log(candidate)
  console.log(saved)

  return (
    <div>
      <h1>Candidate Search</h1>
      {display()}
      <button onClick={save}>Save</button>
      <button onClick={next} style={{marginLeft: 273}}>Next</button>
    </div>
  );
};

export default CandidateSearch;
