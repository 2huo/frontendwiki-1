/**
 * @author 季悠然
 * @date 2021-08-18
 */
import React from 'react';
import styles from './Like.module.css';

class Like extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.MyLike}>
                <h3>我的点赞👍</h3>
            </div>
        );
    }
}

export default Like;