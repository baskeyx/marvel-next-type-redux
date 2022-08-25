// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import md5 from 'md5';

type Data = {
  test: string
}

// const filterOutMessyVersions = (name: string) => {
//   let display = true;
//   const filterOut = ['Marvel Heroes', 'MAA', 'Avengers Alliance', 'Marvel War', 'USM', 'LEGO', 'Iron Man 3', '(HAS)']
//   filterOut.forEach((filter) => {
//     if (name.indexOf(filter) > -1) display = false;
//   })
//   return display;
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const timeStamp = Math.floor(Date.now() / 1000);
  const { MARVELPRIVATEKEY } = process.env.secrets;
  // const hash = md5(`${timeStamp}${MARVELPRIVATEKEY}${MARVELPUBLICKEY}`);
  // const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${req.query.name}&ts=${timeStamp}&apikey=${MARVELPUBLICKEY}&hash=${hash}`);
  // const data = await response.json();
  // const characters: Array<Character> = [];
  // data.data.results.forEach((character: Character) => {
  //   const { id, name, thumbnail } = character;
  //   if (filterOutMessyVersions(name)) characters.push({
  //     id,
  //     name,
  //     thumbnail,
  //   });
  // })
  res.status(200).json({test: `${MARVELPRIVATEKEY}`});
}
