import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectResultsDetails,
  selectNameCountry,
  selectCountryTotalDeaths,
  fetchApiDetails,
} from '../redux/details/details';
import { BASE_URL } from '../utils';

function Details() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const navitage = useNavigate();
  const { id, date } = useParams();
  const dispatch = useDispatch();
  const resultRegions = useSelector(selectResultsDetails);
  const nameCountry = useSelector(selectNameCountry);
  const totalDeaths = useSelector(selectCountryTotalDeaths);

  useEffect(() => {
    dispatch(fetchApiDetails(`${BASE_URL}/${date}/country/${id}`));
  }, []);

  return (
    <div>
      <button type="button" onClick={() => navitage('/')}>
        back
      </button>
      <h3>{nameCountry}</h3>
      <h4>{totalDeaths}</h4>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {resultRegions ? (
          resultRegions.map((region) => (
            <div
              key={region.name}
              style={{
                border: 'solid 1px black',
                padding: '1rem',
                width: '5rem',
                height: '6rem',
              }}
            >
              <p>{region.name}</p>
              <p>{region.todayDeaths}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Details;
