import { useEffect, useMemo, useState } from "react";
import "./App.css";
import * as RnMapi from "./utils/RnMapi";
import { Table } from "./Component/Table";

export default function App() {
  const [dataTable, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [ loading, setLoading ] = useState(true)

  let showTable;
  useEffect(() => {
    const fetchData = async () => {
      let data = await RnMapi.fetchData(page);
      setData(data);
      setLoading(false)
      //console.log(dataTable.data.characters.results);
    };
    fetchData();
  }, [page]);

  if (dataTable == null) {
    showTable = null;
  } else {
    showTable = dataTable.data.characters.results;
  }

  const dataCharacters = useMemo(() => showTable, [showTable]);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Species",
        accessor: "species"
      },
      {
        Header: "Status",
        accessor: "status"
      }
    ],
    []
  );

  return (
    <div className="App">
      <h2>Rick And Morty Characters APi</h2>
      <h3>Based on</h3>
      <a href='https://rickandmortyapi.com/graphql' className='App-link'>Rick and Morty</a>
      <br />
      <label>Input Request Page :</label>
      <input type="number" onChange={(evt) => setPage(evt.target.value)} />
      
      <hr />
      {/* {showTable == null ? (
        <span>Data Null ...Loading</span>
      ) : (
        showTable.map((item) => <span key={item.id}>{item.name}</span>)
      )} */}
      {loading === true ? (
        <span>Loading...</span>
      ) : (
        <Table columns={columns} data={dataCharacters} />
      )}
    </div>
  );
}

//next step : pagination