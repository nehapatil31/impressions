import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import FileBase64 from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    })
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const posts = useSelector((state) => state.posts);
    useEffect(() => {
        if (currentId) {
            const updatedPost = posts.find((post) => post._id === currentId);
            setPostData(updatedPost);
        }
    }, [currentId])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '', message: '', tags: '', selectedFile: ''
        });
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own impressions and like other's impressions.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Impression</Typography>
                {/* <TextField
                    name="creator"
                    variant='outlined'
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                ></TextField> */}
                <TextField
                    name="title"
                    variant='outlined'
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                ></TextField>
                <TextField
                    name="message"
                    variant='outlined'
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                ></TextField>
                <TextField
                    name="tags"
                    variant='outlined'
                    label="tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                ></TextField>
                <div className={classes.fileInput}>
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                        }
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;