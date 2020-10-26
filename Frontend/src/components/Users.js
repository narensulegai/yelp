import React, { useEffect, useRef, useState } from 'react';
import {
  getCustomers, getFollowing,
} from '../util/fetch/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [followingOnly, setFollowingOnly] = useState(false);
  const searchBox = useRef();

  useEffect(() => {
    (async () => {
      const users = await getCustomers('');
      setUsers(users);
    })();
  }, []);

  const handleSearchUser = async () => {
    const text = searchBox.current.value;
    const users = followingOnly ? await getFollowing(text) : await getCustomers(text);
    setUsers(users);
  };

  useEffect(() => {
    (async () => {
      await handleSearchUser();
    })();
  }, [followingOnly]);

  const handleOnCheckboxChange = () => {
    setFollowingOnly(!followingOnly);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div>
          <span className="mr-2">Search</span><input type="text" ref={searchBox} />
          <button className="btn-primary" onClick={handleSearchUser}>Search</button>
        </div>
        <div>
          <input type="checkbox" onChange={handleOnCheckboxChange} value={followingOnly} className="mr-1" />
          <span>Show following only</span>
        </div>
      </div>
      <div className="col-6 mt-2">
        {users.map((u) => {
          return (
            <div key={u.id} className="card mb-2">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <div>
                    <a href={`#/customer/user/${u.id}`}>{u.name}</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Users.propTypes = {
};

export default Users;
