/* eslint-disable operator-linebreak */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectResultsRegionsDetails,
  selectTotalCountry,
  selectStatusDetails,
  fetchApiDetails,
} from '../redux/details/details';
import { page } from '../redux/home/home';
import { BASE_URL } from '../utils';
import Header from '../components/Header';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';

function Details() {
  const { id, date } = useParams();
  const dispatch = useDispatch();
  const resultRegionsDetails = useSelector(selectResultsRegionsDetails);
  const totalCountry = useSelector(selectTotalCountry);
  const status = useSelector(selectStatusDetails);

  useEffect(() => {
    dispatch(fetchApiDetails(`${BASE_URL}/${date}/country/${id}`));
    dispatch(page('details'));
  }, []);

  if (status === 'loading' || status === 'idle') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header data={totalCountry} />
      <CardContainer>
        {resultRegionsDetails.map((region) => (
          <Card key={region.id} data={region} />
        ))}
      </CardContainer>
    </div>
  );
}

export default Details;
