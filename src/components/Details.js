import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectResultsDetails,
  selectNameCountry,
  selectCountryTotalDeaths,
  selectStatusDetails,
  fetchApiDetails,
} from '../redux/details/details';
import { BASE_URL } from '../utils';

function Details() {
  const navitage = useNavigate();
  const { id, date } = useParams();
  const dispatch = useDispatch();
  const resultRegions = useSelector(selectResultsDetails);
  const nameCountry = useSelector(selectNameCountry);
  const totalDeaths = useSelector(selectCountryTotalDeaths);
  const status = useSelector(selectStatusDetails);

  useEffect(() => {
    dispatch(fetchApiDetails(`${BASE_URL}/${date}/country/${id}`));
  }, []);

  return (
    <div>
      <button type="button" onClick={() => navitage('/')}>
        back
      </button>
      {status === 'done' && (
        <div>
          <h3>{nameCountry}</h3>
          <h4>{totalDeaths}</h4>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        {status === 'done' ? (
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
