import { User } from 'meteor/socialize:user-model';
import { Cloudinary } from 'meteor/socialize:cloudinary';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import ReactLetterAvatar from '../LetterAvatar/LetterAvatar.jsx';

const propTypes = {
    user: PropTypes.instanceOf(User),
    size: PropTypes.number,
    noLink: PropTypes.bool,
};

const defaultProps = {
    size: 50,
};

const UserAvatar = ({ user, size, noLink, ...props }) => {
    let returnElement;

    if (!user.avatar) {
        returnElement = (<ReactLetterAvatar name={user.username} size={size} {...props} />);
    } else {
        const url = Cloudinary.url(user.avatar, { width: size, height: size, crop: 'lfill', gravity: 'center' });
        returnElement = (
            <img src={url} width={size} alt="" {...props} />
        );
    }

    return noLink ? returnElement : <Link to={`/profile/${user.username}`}>{returnElement}</Link>;
};

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;

export default UserAvatar;
