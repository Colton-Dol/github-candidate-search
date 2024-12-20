import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
//import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any>([]);

  const candidatesArray: any = [];
  useEffect(() => {
    setCandidates([{id: 1, name: 'oliver', email: 'olimax@gmail.com'}]);
  }, [])

  useEffect(() => {
    searchGithub().then(data => {
     searchGithubUser(data[0].login)
     .then(user => {
      candidatesArray.push(user);
     })
    })
  }, [])

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidates.map((candidate: any) => {
        return (
          <>
           <p>{candidate.name}</p>
           <p>{candidate.email}</p>
          </>
        )
      })}
      <p>{candidatesArray}</p>
    </div>
  );
};

export default CandidateSearch;
