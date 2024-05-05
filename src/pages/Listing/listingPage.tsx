import { useState, useEffect } from 'react';
import './style.scss';
import ListItem from '../../components/ListItem/ListItem';

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
        }
      });
  }, []);

  const Filter = (event: any) => {
    setFilterValue(universitiesData.filter(f => f.name.toLocaleLowerCase().includes(event.target.value)))
  }

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

  console.log("filterValue: ", filterValue);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-header">
          <h1> Universities</h1>

          <div className="filter-wrapper">
            <button onClick={toggleSortOrder}>
              {isAscending ? 'Sort Descending' : 'Sort Ascending'}
            </button>
            <input type="text" onChange={Filter} placeholder='Search ...' />
          </div>
        </div>

        <div className="list-wrapper">
          {
            filterValue.map((item, index) => (
              <ListItem
                key={index}
                url={`/details/${item.name}`}
                label={item.name}
              />
            ))
          }
        </div>

      </div>
      
    </>

  );
};

export default ListingPage;