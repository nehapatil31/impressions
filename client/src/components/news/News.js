import React, { useEffect } from 'react';
import { getNews } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Card, CardMedia, CardHeader, IconButton, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { BookmarkBorder, Bookmark } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './styles';

const News = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
    const newsItems = news?.newsData?.articles;
    const classes = useStyles();

    console.log(news);
    useEffect(() => {
        dispatch(getNews());
    }, [])

    return (
        newsItems ? (
            !newsItems.length ? <CircularProgress /> : (
                <Grid container justify='center' alignItems='stretch' spacing={4}>
                    {newsItems.map((newsItem, index) => (
                        <Grid key={index} item >
                            <Card className={classes.card}>
                                <CardHeader title={newsItem.title} subheader={moment(newsItem.publishedAt).format("Do MMMM YYYY")}
                                    action={
                                        <IconButton aria-label="bookmark">
                                            <BookmarkBorder />
                                        </IconButton>
                                    }
                                ></CardHeader>
                                <CardMedia
                                    image={newsItem.urlToImage}
                                    className={classes.media}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {newsItem.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => {
                                        window.open(newsItem.url)
                                    }}>
                                        Read More
                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )
        ) : (<CircularProgress />)
    )
}

export default News;