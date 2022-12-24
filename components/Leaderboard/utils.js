/*
  Helper function to determine if the person should be displayed in website leaderboard.
*/
export function isUserValid(formData, aocUser) {
  // Attempt to grab a submission form the Google Form with the specified AOC username.
  const formUser = formData[aocUser.name];

  if (!formUser) {
    // User is not valid if we can't find a submission in the Google Form with the specified AOC username.
    // This means the person needs to make sure their AOC username is correctly spelled in their Google Form submission.
    return false;
  }

  // In all other cases, the user is valid.
  return true;
}
