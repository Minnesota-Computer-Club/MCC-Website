// checks if user is in the lb
function userInLb(user, aocMembers) {
  return aocMembers.findIndex((x) => x.name == user) != -1;
}

export function NoLb({AOC, form, regenLocalScores}) {
  const li = []; // array of table rows with info
  let aocMembers = Object.values(AOC); // Convert AOC.members obj into array
  aocMembers = regenLocalScores(aocMembers); // map

  for (const username in form) {
    if (userInLb(username, aocMembers)) continue;

    li.push(
        <li>{username}</li>
    );
  }

  return li;
}
