import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  // TODO: Get profile data from local storage and convert it into rows in the tbody.
  const array = localStorage.getItem('candidates');
  const candidates: Array<Candidate> = JSON.parse(array as string);
  console.log(candidates);
  
  const reject = (name: string): any => {
    const i: number = candidates.findIndex((candidate) => candidate.name === name);
    candidates.splice(i, 1);
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Email</th>
          <th scope="col">Company</th>
          <th scope="col">Bio</th>
          <th scope="col">Reject</th>
        </tr>
        <tbody>
          {candidates.map((candidate) => {
            return (
              <tr>
                <th scope="row">{candidate.avatar_url}</th>
                <td>{candidate.name}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>{candidate.bio}</td>
                <td><button onClick={() => reject(candidate.name)}>Button</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
