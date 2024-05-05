import { useParams } from 'react-router-dom';
import './style.scss';
interface dataType {
    alpha_two_code: string
    name: string
    country: string
    domains: string
    web_pages: string
    state_province: string
}

const DetailPage = () => {
    const { name} = useParams();
    const storedData = JSON.parse(localStorage.getItem('universitiesData') as string);
    console.log("stored ", storedData)
    const findUniversity: dataType = storedData.find((university:dataType) => university.name === name  );
    console.log("data", findUniversity)

    return (
        <div className="page-wrapper">
            <div className="card">
                <h2 className="card-header">{findUniversity.name}</h2>

                <ul className="detail-list">
                    {
                        findUniversity.alpha_two_code && 
                        <li><span>Alpha Code:</span> <div className="tag">{findUniversity.alpha_two_code}</div></li>
                    }

                    {
                        findUniversity.country && 
                        <li><span>Country:</span> {findUniversity.country}</li>
                    }

                    {
                        findUniversity.domains && 
                        <li><span>Domains:</span> {findUniversity.domains} </li>
                    }

                    {
                        findUniversity.web_pages && 
                        <li><span>Web Pages:</span> {findUniversity.web_pages} </li>
                    }
                    
                    {
                        findUniversity.state_province && 
                        <li><span>State:</span> {findUniversity.state_province} </li>
                    }
                    
                </ul>
            </div>
        </div>
       
    )
}

export default DetailPage
