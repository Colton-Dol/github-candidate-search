import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({
    avatar_url: '',
    name: '',
    location: '',
    email: '',
    company: '',
    bio: ''
  });
  const [saved, setSaved] = useState<any[]>([{}]);
  const [index, setIndex] = useState<number>(0);

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
        avatar_url: `${user.avatar_url}`,
        name: `${user.name || ''}(${user.login || ''})`,
        location: user.location,
        email: user.email,
        company: user.company,
        bio: user.bio
      });
    })
  }, [index])

  console.log(candidate)
  console.log(saved)

  return (
    <div>
      <h1>Candidate Search</h1>
        <div style={{backgroundColor: 'black', borderRadius: 1}}>
          <img src={candidate.avatar_url}/>
          <div style={{marginLeft: 15}}>
            <h4>{candidate.name}</h4>
            <p>Location: {candidate.location || 'Not Found'}</p>
            <p>Email: {candidate.email || 'Not Found'}</p>
            <p>Company: {candidate.company || 'Not Found'}</p>
            <p>Bio: {candidate.bio || 'Not Found'}</p>
          </div>
        </div>
      <button onClick={save}>Save</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export default CandidateSearch;
