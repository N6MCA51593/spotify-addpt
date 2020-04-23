import React, { useEffect, Fragment } from 'react';
import useAPIRequest from '../../utils/useAPIRequest';
import PropTypes from 'prop-types';
import LoadingSpinner from '../layout/LoadingSpinner';
import ArtistItem from './ArtistItem';
import AlbumItem from './AlbumItem';

const SearchAndDisplay = ({
  query,
  isSubmitted,
  toggleSubmitted,
  artistName,
  artistID
}) => {
  const [{ isLoading, data }, setConfig] = useAPIRequest({}, []);

  useEffect(() => {
    if (!artistID && isSubmitted === true) {
      setConfig({
        url: '/api/library/add/search',
        method: 'get',
        params: { query: query }
      });
    }
    if (artistID && isSubmitted === true) {
      setConfig({
        url: '/api/library/append/search',
        method: 'get',
        params: { query: query, artistname: artistName, id: artistID }
      });
    }

    toggleSubmitted(false);
    // eslint-disable-next-line
  }, [isSubmitted]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data.msg) {
    return (
      <Fragment>
        <p>{data.msg}</p>
      </Fragment>
    );
  }

  return (
    <div className='search-results'>
      {data.map(dataE => {
        return artistID ? (
          <AlbumItem key={dataE.spID} album={dataE} artistID={artistID} />
        ) : (
          <ArtistItem key={dataE.spID} artist={dataE} />
        );
      })}
    </div>
  );
};

SearchAndDisplay.propTypes = {
  query: PropTypes.string.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  toggleSubmitted: PropTypes.func.isRequired
};

export default SearchAndDisplay;