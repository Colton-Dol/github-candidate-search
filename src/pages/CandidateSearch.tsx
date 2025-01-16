import { useState, useEffect, useRef } from 'react';
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
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);
  const [saved, setSaved] = useState<any[]>([]);
  let index = useRef(0);
  
  useEffect(() => {
    searchGithub()
    .then((data) => {
      setSaved(data)
      console.log(data)
      searchGithubUser(data[index.current].login)
      .then((user) => {
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
    });
  }, [])

  const display = () => {
    return (
      <div>
        {noMoreCandidates === true ? (
          <div style={{backgroundColor: 'black', borderRadius: 25, textAlign: 'center'}}>
            <h2>No More Candidates Available</h2>
          </div>
        ) : (
          <div className='card' style={{backgroundColor: 'black', borderRadius: 25}}>
            <img src={candidate.avatar_url}/>
            <div className='hi' style={{marginLeft: 15}}>
              <h2>{candidate.name}({candidate.username})</h2>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <p>Bio: {candidate.bio}</p>
            </div>
          </div>
        )}
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

    index.current += 1;
    if (index.current <= 29) {
      searchGithubUser(saved[index.current].login)
      .then((user) => {
        if (JSON.stringify(user) === '{}') {
          setCandidate({
            id: user.id,
            avatar_url: user.avatar_url,
            name: user.name || '',
            username: 'Not Found',
            location: user.location || 'N/A',
            email: user.email || 'N/A',
            company: user.company || 'N/A',
            bio: user.bio || 'N/A'
          });
        } else {
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
        }
      })
    } else {
      setNoMoreCandidates(true);
    }
  }

  const next = () => {
    index.current += 1;
    if (index.current <= 29) {
      searchGithubUser(saved[index.current].login)
      .then((user) => {
        if (JSON.stringify(user) === '{}') {
          setCandidate({
            id: user.id,
            avatar_url: user.avatar_url,
            name: user.name || '',
            username: 'Not Found',
            location: user.location || 'N/A',
            email: user.email || 'N/A',
            company: user.company || 'N/A',
            bio: user.bio || 'N/A'
          });
        } else {
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
        }
      })
    } else {
      setNoMoreCandidates(true);
    }
  }

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
