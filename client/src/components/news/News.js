import React, { useEffect } from 'react';
import { getNews, bookmarkNews } from '../../actions/news';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Card, CardMedia, CardHeader, IconButton, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { BookmarkBorder, Bookmark } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './styles';
import Modal from '../modal/Modal';

const News = () => {
	const dispatch = useDispatch();
	const news = useSelector((state) => state.news);
	const newsItems = news?.newsData?.articles;
	const classes = useStyles();
	const [openModal, setOpenModal] = React.useState(false);
	const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));

	console.log(news);
	useEffect(() => {
		dispatch(getNews());
	}, [])

	const handleBookmark = async (title) => {
		if (!user) {
			setOpenModal(true);
			return;
		}

		title = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
		await dispatch(bookmarkNews(title));
		setUser(JSON.parse(localStorage.getItem('profile')));
	}

	const BookmarkIcon = ({ title }) => {
		title = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
		if (user && user.result?.news?.length > 0) {
			if (user.result.news.find(id => id === title)) return <Bookmark />;
		}
		return (<BookmarkBorder />)
	}
	return (
		newsItems ? (
			!newsItems.length ? <CircularProgress /> : (
				<Grid container justify='center' alignItems='stretch' spacing={4}>
					{newsItems.map((newsItem, index) => (
						<Grid key={index} item >
							<Card className={classes.card}>
								<CardHeader title={newsItem.title} subheader={moment(newsItem.publishedAt).format("Do MMMM YYYY")}
									action={
										<IconButton aria-label="bookmark" onClick={() => { handleBookmark(newsItem.title) }}>
											<BookmarkIcon title={newsItem.title} />
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
						</Grid >
					))}
					<Modal openModal={openModal} setOpenModal={setOpenModal} isConfirm={false}>
						Please sign in to bookmark news!
                    </Modal>
				</Grid >

			)
		) : (<CircularProgress />)
	)
}

export default News;