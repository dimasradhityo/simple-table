export const fetchData = (page) =>
  fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
      query getCharacterByPage($page:Int){
        characters(page:$page){
          info{
            count
            pages
            prev
            next
          }
          results{
            type
            id
            name
            status
            species
          }
        }
    }
      `,
      variables: {
        page: page
      }
    })
  })
    .then((res) => res.json())
    .then((result) => result);