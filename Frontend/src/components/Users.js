import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  getCustomers, getFollowing,
} from '../util/fetch/api';
import Paginate from './Paginate';
import { slicePage } from '../util';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [followingOnly, setFollowingOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const searchBox = useRef();

  useEffect(() => {
    (async () => {
      setUsers(await getCustomers(''));
    })();
  }, []);

  const handleSearchUser = useCallback(() => {
    (async () => {
      const text = searchBox.current.value;
      const users = followingOnly ? await getFollowing(text) : await getCustomers(text);
      setUsers(users);
    })();
  }, [followingOnly]);

  useEffect(() => {
    (async () => {
      await handleSearchUser();
    })();
  }, [followingOnly, handleSearchUser]);

  const handleOnCheckboxChange = () => {
    setFollowingOnly(!followingOnly);
  };

  return (
    <div className="row">
      <div className="col-12">
        <span className="mr-2">Search</span>
        <input type="text" ref={searchBox} />
        <button className="btn-primary" onClick={handleSearchUser}>Search</button>
        <input type="checkbox" onChange={handleOnCheckboxChange} value={followingOnly} className="mr-1 ml-2" />
        <span>Show following only</span>
      </div>
      <div className="col-6 mt-2">
        {users.length === 0 && <div>No user to show.</div>}
        {slicePage(users, currentPage).map((u) => {
          return (
            <div key={u.id} className="card mb-2">
              <div className="card-body d-flex justify-content-between">
                <a href={`#/customer/user/${u.id}`}>{u.name}</a>
              </div>
            </div>
          );
        })}
        <Paginate currentPage={currentPage} onPageChange={setCurrentPage} numItems={users.length} />
      </div>
    </div>
  );
};

Users.propTypes = {
};

export default Users;
