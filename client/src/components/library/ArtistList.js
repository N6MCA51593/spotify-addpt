import React, { Fragment, useContext, useEffect } from 'react';
import LibraryContext from '../../context/library/libraryContext';
import ArtistItem from './ArtistItem';
import DeleteArtistOrAlbum from './DeleteArtist';
import LoadingSpinner from '../layout/LoadingSpinner';
import Accordion from '../layout/Accordion';
import useModal from '../../utils/useModal';
import SearchModal from '../layout/SearchModal';
import Modal from '../layout/Modal';
import useAPIRequest from '../../utils/useAPIRequest';
import useDeleteArtistOrAlbum from '../../utils/useDeleteArtist';

const ArtistList = () => {
  const { artists, loading, toggleArtist, deleteArtist } = useContext(
    LibraryContext
  );
  const { isShowing, type, toggle, setIsShowing, setType } = useModal();
  const [{ data, isError }, setConfig] = useAPIRequest({});
  const { id, name, setName, setID, setConfirmed } = useDeleteArtistOrAlbum();

  useEffect(() => {
    setIsShowing(false);
  }, [artists, setIsShowing]);

  useEffect(() => {
    if (data && !isError) {
      toggleArtist(data);
    }
  }, [data, isError]);

  const delArtist = (id, name) => {
    toggle();
    setType('delete');
    setID(id);
    setName(name);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='wrapper'>
      {artists && (
        <Fragment>
          <Modal isShowing={isShowing} hide={toggle}>
            {type === 'delete' ? (
              <DeleteArtistOrAlbum
                id={id}
                name={name}
                deleteArtist={deleteArtist}
                hide={toggle}
                setConfirmed={setConfirmed}
                setType={setType}
              />
            ) : (
              <SearchModal />
            )}
          </Modal>
          <Accordion openByDef={true} title={'Tracked'} toggle={toggle}>
            {artists
              .filter(artistsE => !artistsE.isArchived && artistsE.isTracked)
              .map(artistsE => {
                return (
                  <ArtistItem
                    key={artistsE._id}
                    artist={artistsE}
                    toggleArtistSetConfig={setConfig}
                    delArtist={delArtist}
                  />
                );
              })}
          </Accordion>
          {artists.some(
            artistE => !artistE.isTracked && !artistE.isArchived
          ) && (
            <Accordion openByDef={false} title={'Not Tracked'}>
              {artists
                .filter(artistsE => !artistsE.isTracked && !artistsE.isArchived)
                .map(artistsE => {
                  return (
                    <ArtistItem
                      key={artistsE._id}
                      artist={artistsE}
                      toggleArtistSetConfig={setConfig}
                      delArtist={delArtist}
                    />
                  );
                })}
            </Accordion>
          )}
          {artists.some(artistE => artistE.isArchived) && (
            <Accordion openByDef={false} title={'Archived'}>
              {artists
                .filter(artistsE => artistsE.isArchived)
                .map(artistsE => {
                  return (
                    <ArtistItem
                      key={artistsE._id}
                      artist={artistsE}
                      toggleArtistSetConfig={setConfig}
                      delArtist={delArtist}
                    />
                  );
                })}
            </Accordion>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ArtistList;
