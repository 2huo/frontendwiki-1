/**
 * @author 季悠然
 * @date 2021-08-18
 */
import React from 'react';
import styles from './MyPost.module.css';

class MyPost extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.MyPost}>
                <h3>我的发布👍</h3>
            </div>
        );
    }
}

export default MyPost;