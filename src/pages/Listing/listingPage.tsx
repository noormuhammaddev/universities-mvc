import { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface dataType {
  alpha_two_code: string
  name: string
  country: string
  domains: string
  web_pages: string
  state_province: string
}

const ListingPage = () => {

  const [universitiesData, setUniversitiesData] = useState<dataType[]>([])
  const [filterValue, setFilterValue] = useState<dataType[]>([])
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {

    fetch(`http://universities.hipolabs.com/search?country=United%20Arab%20Emirates`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        setUniversitiesData(json as dataType[]);
        setFilterValue(json as dataType[]);
        localStorage.setItem('universitiesData', JSON.stringify(json));
      })
      .catch(error => {
        console.error("Fetch error: ", error);
        // Try to retrieve data from local storage
        const storedData = localStorage.getItem('universitiesData');
        if (storedData) {
          setUniversitiesData(JSON.parse(storedData));
        } else {
          console.error('No data available in local storage.');
          // Handle the case when there's no data available
          // You might display an error message to the user or fallback to default values.
        }
      });


  }, []);

  const Filter = (event: any) => {
    setFilterValue(universitiesData.filter(f => f.name.toLocaleLowerCase().includes(event.target.value)))
  }

  // const AscendingData = () => {
  //   const sortData = universitiesData.sort((a,b) => a.name.localeCompare(b.name))
  //   console.log("sortData", sortData)
  //   setFilterValue(sortData)
  // }

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
    const sortedData = [...filterValue].sort((a, b) => {
      if (isAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilterValue(sortedData);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className='left'>
          <h2> Universities</h2>
        </div>
        <div className='right' style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="button" style={{ marginRight: "4px" }}>
            <button onClick={toggleSortOrder}>
              {isAscending ? 'Sort Descending' : 'Sort Ascending'}
            </button>
          </div>
          <div className="inputBox" >
            <input type="text" onChange={Filter} placeholder='Search ...' />
          </div>
        </div>
      </div>
      <div>
        {
          filterValue.map((item) => (
            <Link to={`/details/${item.name}`} style={{ color: 'black', textDecoration: 'none' }}>
              <li> {item.name}</li>
            </Link>
          ))
        }
      </div>
    </>

  );
};

export default ListingPage;