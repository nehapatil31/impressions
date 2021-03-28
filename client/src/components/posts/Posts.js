import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/Post'
import Modal from 'components/modal/Modal';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    const [openModal, setOpenModal] = React.useState(false);
    const [modalCallback, setModalCallback] = React.useState();


    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} setOpenModal={setOpenModal} setModalCallback={setModalCallback} />
                    </Grid>
                ))}
                <Modal openModal={openModal} setOpenModal={setOpenModal} onConfirm={modalCallback} isConfirm={true}>
                    Are you sure you want to delete post?
                </Modal>
            </Grid>
        )
    )
}

export default Posts;