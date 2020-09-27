import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite, } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {
    const dish = props.dish;
    handleViewRef = null;
    const recognizeDrag = ({ dx }) => {
        if (dx < -200) return true; // Swipe right to left
        return false;
    };
    const recognizeComment = ({ dx }) => {
        if (dx > 200) return true; // Swipe left to right
        return false;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => this.handleViewRef.rubberBand(1000),
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState)) {
            Alert.alert(
            'Add to Favorites?',
            `Are you sure you wish to add ${dish.name} to your favorites?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => props.favorite ? console.log('Already favorited') : props.markFavorite(),
                },
            ], { cancelable: false },
            );
        } else if (recognizeComment(gestureState)) {
            props.openCommentForm();
        }
        return true;
      },
    });
    if (dish != null) {
        return(
            <Animatable.View
                animation="fadeInDown" duration={2000}
                ref={(ref) => handleViewRef = ref}
                {...panResponder.panHandlers}
            >
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.markFavorite()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.openCommentForm()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;  
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10, flex: 1}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating style={{marginRight: 'auto'}} imageSize={12} readonly startingValue={item.rating} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>    
            <Card title='Comments'>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: '',
            comment: '',
            showCommentForm: false,
        };
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    setRating(rating) {
        this.setState({ rating: rating });
    }
    setAuthor(author) {
        this.setState({ author: author });
    }
    setComment(comment) {
        this.setState({ comment: comment });
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    resetCommentForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: '',
            showCommentForm: false,
        });
    }
    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetCommentForm();
    }
    openCommentForm() {
        this.setState({ showCommentForm: true });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    markFavorite={() => this.markFavorite(dishId)} 
                    openCommentForm={() => this.openCommentForm()}
                />
                <Modal animationType = {"slide"} transparent = {false}
                    visible={this.state.showCommentForm}
                    onDismiss={() => this.resetCommentForm()}
                    onRequestClose={() => this.resetCommentForm()}>
                    <View style={{justifyContent: 'center', margin: 20}}>
                        <Rating
                            type='star'
                            ratingCount={5}
                            minValue={1}
                            imageSize={40}
                            showRating
                            onFinishRating={(rating) => this.setRating(rating)}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                            onChangeText={(author) => this.setAuthor(author)}
                        />
                        <Input
                            placeholder="Comment"
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={(comment) => this.setComment(comment)}
                        />
                        <Button 
                            onPress={() => this.handleComment(dishId)}
                            color="#512DA8"
                            title="Submit"
                        />
                        <Button 
                            onPress={() => this.resetCommentForm()}
                            color="#777B7E"
                            title="Cancel"
                        />
                    </View>
                </Modal>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);