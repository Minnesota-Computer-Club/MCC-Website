/*
    "enums"
*/

const MAX_STARS = 25;
const STAR = "★";
const FORMAT = "%PLACE) %SCORE %STARS %NAME (%SCHOOL)";
const PATHTOINDIVIDUALDATA =
  "/var/www/private/AOC/2021/rochester_data_file.json";
const PATHTOTEAMS = "/var/www/private/WCC/2021/rochester_team_file.json";
const PATHTOCSV = "/var/www/private/WCC/2021/rochester_users.json";
const SCHOOLTOCOLOR = {
  mayo: "1a743a",
  jm: "cb2026",
  century: "ff9ff3",
  lincoln: "64bbed",
  ctech: "ffc01f",
  kellogg: "0d78bb",
};
const NAMETOVIDEO = {
  "Mr. Bartucz": "rickroll.mp4",
  "Kenneth Harrer": "iwontletugo.mp4",
  CODINGBEASTS: "puterhasvirus.mp4",
  Century: "panthers.mp4",
  Mayo: "mayo.mp4",
  JM: "rocketship.mp4",
  CTECH: "jazz.mp4",
};

/*
    let Initlilzation
*/

let schoolData = {};
let CSVData;
let individualData;
let teamData;

/*
Move these later
*/

function getName(AOCUsername) {
  const CSV = CSVData[AOCUsername];
  if (!CSV) return AOCUsername;
  return CSV[`What is your first and last name?`] || AOCUsername;
}

function getSchool(AOCUsername) {
  const CSV = CSVData[AOCUsername];
  if (!CSV) return "?";
  return CSV[`Which school do you attend?`] || "?";
}

function getTeamName(AOCUsername) {
  const CSV = CSVData[AOCUsername];
  if (!CSV) return "?";
  return CSV[`What is your team name?`].trim() || "?";
}

function generateStars(stars) {
  const goldStars = document.createElement("span");
  goldStars.classList.add("goldStar");
  goldStars.innerText = STAR.repeat(Math.floor(stars / 2));

  const silverStars = document.createElement("span");
  silverStars.classList.add("silverStar");
  silverStars.innerText = STAR.repeat(stars % 2);

  const incompleteStars = document.createElement("span");
  incompleteStars.classList.add("incompleteStar");
  incompleteStars.innerText = STAR.repeat(MAX_STARS - Math.ceil(stars / 2));
  return [goldStars, silverStars, incompleteStars];
}

function teamOrIndividual(AOCUsername) {
  const CSV = CSVData[AOCUsername];
  if (!CSV) return undefined;
  return (
    CSV[`Are you participating as part of a team or as an individual?`]
      .trim()
      .toLowerCase() == "team"
  );
}
window.addEventListener("load", async (event) => {
  //CSV data
  let res = await fetch(PATHTOCSV);
  CSVData = await res.json();

  //individual data

  res = await fetch(PATHTOINDIVIDUALDATA); //get individual data
  individualData = await res.json(); //parse as json
  individualData = Object.values(individualData.members); //only members & turn into array
  individualData.sort(
    (a, b) => b.stars - a.stars || b.local_score - a.local_score
  ); //sort by starts, then by local score

  //team data

  res = await fetch(PATHTOTEAMS); //get team data
  teamData = await res.json(); //parse as json
  teamData = Object.values(teamData.members); //only members & turn into array
  teamData.sort((a, b) => b.stars - a.stars || b.local_score - a.local_score); //sort by starts, then by local score

  /*
        Lol I made this so much worse
    */

  let highestScore = undefined;
  let hasTeamRendered = {};
  let rankingsAndScores = { team: {}, individual: {} };
  let starInformation = { team: {}, individual: {} };
  let listNames = {};
  let listSchools = {};
  let nameInformation = { team: {}, individual: {} };
  let teamColors = {};
  let teamMembers = {};
  let additionalInfoOBJ = {};
  let iDontKnowWhatToCallThis = {};
  //find spacing data, then generate elements
  var newTD = [];
  for (i = 0; i < teamData.length; i++) {
    const username = teamData[i].name;
    if (teamOrIndividual(username)) {
      newTD.push(teamData[i]);
    }
  }
  teamData = newTD;
  const combined = [...individualData, ...teamData].sort(
    (a, b) => b.stars - a.stars || b.local_score - a.local_score
  );
  for (individual of combined) {
    const username = individual.name;
    const name = getName(username);
    const school = getSchool(username);
    const score = individual.local_score;
    const stars = individual.stars;
    const team = teamOrIndividual(username);
    const teamName = getTeamName(username);
    let teamColor = "white";
    const teamOrIndividualKey = team ? "team" : "individual";
    if (team == undefined) continue;
    if (score == 0) continue;
    if (team) {
      if (hasTeamRendered[teamName]) continue;
      hasTeamRendered[teamName] = true;
    }
    if (!highestScore) highestScore = score;
    iDontKnowWhatToCallThis[teamOrIndividualKey] =
      iDontKnowWhatToCallThis[teamOrIndividualKey] + 1 || 1;
    rankingsAndScores[teamOrIndividualKey][username] = [
      iDontKnowWhatToCallThis[teamOrIndividualKey]
        .toString()
        .padStart(combined.length.toString().length) + ")",
      score.toString().padStart(highestScore.toString().length + 1) + " ",
    ];
    starInformation[teamOrIndividualKey][username] = generateStars(
      individual.stars
    );
    if (team == true) {
      /*
                This code is only executed when the highest memeber of a team loops
            */
      let schools = {};
      let totalTeamMembers = 0;
      for (participant of Object.values(CSVData)) {
        if (participant[`What is your team name?`].trim() == teamName) {
          tschool = participant[`Which school do you attend?`].trim();
          teamMembers[teamName] = teamMembers[teamName] || [];
          teamMembers[teamName].push({
            name: participant[`What is your first and last name?`],
            discord:
              participant[
                `If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.`
              ],
            language:
              participant[`Which programming language do you plan on using?`],
            username:
              participant[
                `What is your Advent of Code Username? (Make sure you are logged in to see it!)`
              ],
          });
          schools[tschool] = (schools[tschool] ? schools[tschool] : 0) + 1;
          totalTeamMembers += 1;
        }
      }

      let schoolList = [];
      let colorList = [];
      for (schoolName of Object.keys(schools)) {
        schoolData[schoolName] = schoolData[schoolName] || {};
        const numberOfPeople = schools[schoolName];
        for (i = 0; i < numberOfPeople; i++) {
          schoolList.push(schoolName.charAt(0));
          schoolData[schoolName].participants =
            (schoolData[schoolName].participants || 0) + 1;
        }
        const ratio = numberOfPeople / totalTeamMembers;
        //if (!schoolData[schoolName].stars) schoolData[schoolName].stars = 0; //ensure this school's star count exists
        //schoolData[schoolName].stars += person.stars * ratio;
        colorList.push([
          ...hexToRGB(SCHOOLTOCOLOR[schoolName.toLowerCase()]),
          ratio,
        ]);
        schoolData[schoolName].stars =
          (schoolData[schoolName].stars || 0) + stars * ratio;
      }

      listNames[username] = teamName;
      listSchools[username] = "(" + schoolList.join("/") + ")";
      teamColor = mixRGB(colorList);
      teamColors[username] = teamColor;
    } else {
      if (listNames[username]) continue;
      listNames[username] = name;
      additionalInfoOBJ[username] = {
        username: username,
        discord:
          CSVData[username][
            `If you are participating in the RCC Discord server, you will be automatically added to specific channels when you complete stars. You can join here: https://discord.gg/hsN92V4  - Please enter your Discord username so we can verify you.`
          ],
        language:
          CSVData[username][`Which programming language do you plan on using?`],
      };
      listSchools[username] = "(" + school + ")";
      schoolData[school] = schoolData[school] || {};
      schoolData[school].stars = (schoolData[school].stars || 0) + stars;
      schoolData[school].participants =
        (schoolData[school].participants || 0) + 1;
    }
  }
  const longestName =
    Object.values(listNames).reduce(function (a, b) {
      return a.length > b.length ? a : b;
    }).length + 1;
  const longestSchool =
    Object.values(listSchools).reduce(function (a, b) {
      return a.length > b.length ? a : b;
    }).length + 1;
  for (name of Object.keys(listNames)) {
    const teamOrIndividualKey = rankingsAndScores["team"][name]
      ? "team"
      : "individual";
    nameInformation[teamOrIndividualKey][name] = [
      listNames[name].padStart(longestName),
      listSchools[name].padStart(longestSchool),
    ];
  }

  const teamSectionElement = document
    .querySelector(`section[name="teams"]`)
    .querySelector("div");
  //console.log(rankingsAndScores['team']);
  //console.log(nameInformation['team']);
  for (team of Object.keys(rankingsAndScores["team"])) {
    const [name, schoolList] = nameInformation["team"][team];
    const [place, localScore] = rankingsAndScores["team"][team];
    const [goldStars, silverStars, incompleteStars] =
      starInformation["team"][team];
    const teamColor = teamColors[team];
    const div = document.createElement("div");
    div.classList.add("person");
    div.appendChild(document.createTextNode(place + localScore));
    div.appendChild(goldStars);
    div.appendChild(silverStars);
    div.appendChild(incompleteStars);
    const span = document.createElement("span");
    span.style = `color: rgb(${teamColor});
text-shadow: 0 0 4px rgb(${teamColor})`;
    span.innerText = `${name}${schoolList}`;
    if (NAMETOVIDEO[name.trim()]) {
      div.addEventListener("click", () => {
        playVideo(NAMETOVIDEO[name.trim()]);
      });
    }
    div.appendChild(span);
    div.appendChild(document.createElement("br"));
    const additionalInfo = document.createElement("div");
    additionalInfo.classList.add("additionalInfo");

    for (teamMember of teamMembers[name.trim()]) {
      const infoSpan = document.createElement("span");
      infoSpan.classList.add("info");
      infoSpan.innerText =
        "Name: " +
        teamMember.name +
        "  Discord: " +
        (teamMember.discord || "n/a") +
        "  Languaged Used: " +
        teamMember.language;
      additionalInfo.appendChild(infoSpan);
    }

    div.appendChild(additionalInfo);
    teamSectionElement.appendChild(div);
  }

  const individualSectionElement = document
    .querySelector(`section[name="individual"]`)
    .querySelector("div");

  for (individual of Object.keys(rankingsAndScores["individual"])) {
    const [name, schoolList] = nameInformation["individual"][individual];
    const [place, localScore] = rankingsAndScores["individual"][individual];
    const [goldStars, silverStars, incompleteStars] =
      starInformation["individual"][individual];
    const school = listSchools[individual].replace(")", "").replace("(", "");
    const div = document.createElement("div");
    div.classList.add("person");
    div.appendChild(document.createTextNode(place + localScore));
    div.appendChild(goldStars);
    div.appendChild(silverStars);
    div.appendChild(incompleteStars);
    const span = document.createElement("span");
    span.classList.add(school);
    span.innerText = `${name}${schoolList}`;
    div.appendChild(span);
    if (name.trim() == "Mr. Dirks") div.addEventListener("click", mrDirks);
    if (NAMETOVIDEO[name.trim()]) {
      div.addEventListener("click", () => {
        playVideo(NAMETOVIDEO[name.trim()]);
      });
    }

    const inf = additionalInfoOBJ[individual];

    const disc = inf.discord;
    const user = inf.username;
    const lang = inf.language;

    const additionalInfo = document.createElement("div");
    additionalInfo.classList.add("additionalInfo");

    const aocUsername = document.createElement("span");
    aocUsername.classList.add("info");
    aocUsername.innerText = "AOC Username: " + user;
    additionalInfo.appendChild(aocUsername);

    const discord = document.createElement("span");
    discord.classList.add("info");
    discord.innerText = "Discord: " + (disc.length > 1 ? disc : "n/a");
    additionalInfo.appendChild(discord);

    const language = document.createElement("span");
    language.classList.add("info");
    language.innerText = "Language Used: " + lang || "n/a";
    additionalInfo.appendChild(language);

    //additionalInfo.innerText = 'here is some more info';

    div.appendChild(additionalInfo);
    individualSectionElement.appendChild(div);
  }

  /*
    Render Individuals
    */

  //renderIndividualSection(individualData, individualSectionElement);

  /*
        School Section
    */

  try {
    const schoolSectionElement = document
      .querySelector(`section[name="schools"]`)
      .querySelector("div");
    let schoolNames = Object.keys(schoolData);
    schoolNames.sort((a, b) => schoolData[b].stars - schoolData[a].stars);
    renderSchoolSection(schoolNames, schoolSectionElement);
  } catch (e) {
    console.log("School Section failed to render\n", e);
  }

  /*
        Stats Section
    */
  try {
    const statisticsSectionElement = document
      .querySelector(`section[name="stats"]`)
      .querySelector("div");
    renderStats(statisticsSectionElement);
  } catch (e) {
    console.log("Statistics Section failed to render\n", e);
  }

  /*
        Easter Egg
    */

  const mainTitle = document.querySelector("h1");
  const title = mainTitle.innerText;
  mainTitle.addEventListener("click", () => {
    if (mainTitle.innerText != title) return;
    mainTitle.innerText =
      "Made by github.com/KennyHarrer 👺 with help from github.com/cursorweb 🍪, and github.com/jobartucz 🤔";
    setTimeout(() => {
      mainTitle.innerText = title;
    }, 5000);
  });
});

/*
    Render functions
*/

function renderSchoolSection(schoolNames, sectionElement) {
  const maxSchool = [...schoolNames].sort((a, b) => b.length - a.length)[0]
    .length;
  for (i = 0; i < schoolNames.length; i++) {
    const schoolName = schoolNames[i];
    const starCount = schoolData[schoolName].stars;
    const playerCount = schoolData[schoolName].participants;
    const school = document.createElement("div");
    const efficiency = (starCount / playerCount).toFixed(1);
    school.classList.add(schoolName, "person");
    school.innerText = `${i + 1}) ${schoolName} ${" ".repeat(
      maxSchool - schoolName.length
    )} ${STAR}Total Stars: ${starCount
      .toString()
      .padStart(3, " ")}${STAR} Participants: ${playerCount
      .toString()
      .padStart(2, " ")} Efficiency: ${efficiency}`;
    if (NAMETOVIDEO[schoolName]) {
      school.addEventListener("click", () => {
        playVideo(NAMETOVIDEO[schoolName]);
      });
    }
    sectionElement.appendChild(school);
  }
}

function renderStats(sectionElement) {
  /*
        Data Collection
    */
  let schools = Object.values(schoolData);
  let totalParticipants = 0;
  let totalStars = 0;
  for (school of schools) totalParticipants += school.participants;
  for (school of schools) totalStars += school.stars;
  /*
        Render Data
    */
  //total players
  const totalPlayersElement = document.createElement("div");
  totalPlayersElement.innerText = "Total Participants: " + totalParticipants;
  totalPlayersElement.classList.add("stat");
  sectionElement.appendChild(totalPlayersElement);
  //total stars
  const totalStarsElement = document.createElement("div");
  totalStarsElement.innerText = "Total Stars: " + totalStars;
  totalStarsElement.classList.add("stat");
  sectionElement.appendChild(totalStarsElement);

  /*
        Time til competition end
    */
  const countDownDate = new Date("Jan 1, 2022 0:0:01").getTime();

  const TTE = document.createElement("div");
  TTE.setAttribute("id", "TTE");
  TTE.classList.add("person");

  function init() {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="clock"
    TTE.innerHTML =
      "Time left: " +
      days +
      "d " +
      hours +
      "h " +
      minutes +
      "m " +
      seconds +
      "s ";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      TTE.innerHTML = "EXPIRED";
    }
  }

  let x = setInterval(init, 1000);

  init();

  sectionElement.appendChild(TTE);
}

/*
    More Easter Eggs
*/

function playVideo(url) {
  if (document.querySelector("video")) return;
  const video = document.createElement("video");
  video.style = "display: none;";
  video.src = url;
  video.addEventListener("ended", () => {
    video.remove();
  });
  video.addEventListener("playing", () => {
    video.style = "display: block;";
  });
  video.play();
  document.querySelector("main").appendChild(video);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mrDirks() {
  const main = document.querySelector("main");
  const times = 20;
  const lasts = 0.4;
  for (i = 0; i < times; i++) {
    main.style = "font-size: 2.5em;";
    await sleep((lasts / 2) * 1000);
    main.removeAttribute("style");
    await sleep((lasts / 2) * 1000);
  }
}

/*
    Color mixing
*/

function hexToRGB(hex) {
  let aRgbHex = hex.match(/.{1,2}/g);
  let aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
  return aRgb;
}

function mixRGB(rgbs) {
  //sum of all ratios must add up to 1
  let r = 0;
  let g = 0;
  let b = 0;
  for ([red, green, blue, ratio] of rgbs) {
    r += red * ratio;
    g += green * ratio;
    b += blue * ratio;
  }
  return [r, g, b];
}
