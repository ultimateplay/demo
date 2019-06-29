export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3500/api/bonuses");
    const responseHeader = await fetch("http://localhost:3500/api/header");

    const bonuses = await response.json();
    const header = await responseHeader.json();

    return { bonuses: bonuses, header: header };
    //return data;
  } catch (e) {
    console.log(e);
  }
};
