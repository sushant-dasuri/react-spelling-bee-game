import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import './App.css';

function App() {
    const [data, setData] = useState();
    useEffect(() => {
      async function fetchData() {
       const results =
       await fetch('api/data.json', {headers: {"Content-Type": "application/json"}})
       const json = await results.json();
       setData(json.data.today);
        
    }
    fetchData();
    }, []);

    return (
        <>
        {data ? <Header date={data.displayDate} editor={data.editor} />
        : <p>Loading...</p>
        }
        </>
    );

}

export default App;