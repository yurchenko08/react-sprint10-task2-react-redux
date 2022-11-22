import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {shallow, configure, mount} from "enzyme";
import NewPostForm from '../tasks/02-react-redux/NewPostForm';
import PostsList from '../tasks/02-react-redux/PostsList';
import ReactReduxTask from "../tasks/02-react-redux/Task";
import store from "../tasks/02-react-redux/store";
import {Provider} from "react-redux";
import _ from "lodash";
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});
describe("Tasks", () => {
    it('Check if Provider is present', () => {
        const wrapper = shallow(<ReactReduxTask/>);
        expect(wrapper.find(Provider)).toHaveLength(1);
    });

    it('Check if Provider has store props', () => {
        const wrapper = mount(<ReactReduxTask/>);
        expect(_.isEqual(wrapper.find(Provider).props().store, store)).toBeTruthy();
    });
});

describe("NewPostForm", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Has action creator in props', () => {
        const wrapper = mount(<Provider store={store}><NewPostForm/></Provider>);
        const childProps = wrapper.find(NewPostForm).childAt(0).props();
        expect(childProps.hasOwnProperty("addNewPost")).toBeTruthy();
    });

    it('Has authors in props', () => {
        const wrapper = mount(<Provider store={store}><NewPostForm/></Provider>);
        const childProps = wrapper.find(NewPostForm).childAt(0).props();
        expect(childProps.hasOwnProperty("authors")).toBeTruthy();
    });

    it('Check authors content', () => {
        const wrapper = mount(<Provider store={store}><NewPostForm/></Provider>);
        const childProps = wrapper.find(NewPostForm).childAt(0).props();
        expect(childProps.authors === store.getState().authors).toBeTruthy();
    });

    it('Check action creator', () => {
        const state = {
            title: "Hello Kitty",
            selectedAuthor: "bkenobi",
        }
        const mockStore = configureMockStore()
        const theStore = mockStore({})
        const wrapper = mount(<Provider store={theStore}><NewPostForm/></Provider>);
        const comp = wrapper.find(NewPostForm).childAt(0)
        comp.setState(state);
        comp.props().addNewPost("bkenobi", "Hello Kitty");
        expect(theStore.getActions()[0]).toEqual({
            type: "ADD_NEW_POST",
            id: expect.any(String),
            authorId: state.selectedAuthor,
            title: state.title,
        });
    });


    it('Store should not dispatch if title is empty', () => {
        const state = {
            title: "",
            selectedAuthor: null,
        }
        const mockStore = configureMockStore()
        const theStore = mockStore({})
        const wrapper = mount(<Provider store={theStore}><NewPostForm/></Provider>);
        wrapper.find(NewPostForm).childAt(0).setState(state);
        wrapper.find('button').props().onClick();
        expect(theStore.getActions().length).toBe(0);
    });
});

describe("PostsList", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Has posts in props', () => {
        const wrapper = mount(<Provider store={store}><PostsList/></Provider>);
        const childProps = wrapper.find(PostsList).childAt(0).props();
        expect(childProps.hasOwnProperty("posts")).toBeTruthy();
    });

    it('Has authors in props', () => {
        const wrapper = mount(<Provider store={store}><PostsList/></Provider>);
        const childProps = wrapper.find(PostsList).childAt(0).props();
        expect(childProps.hasOwnProperty("authors")).toBeTruthy();
    });

    it('Check authors content', () => {
        const wrapper = mount(<Provider store={store}><PostsList/></Provider>);
        const childProps = wrapper.find(PostsList).childAt(0).props();
        expect(childProps.authors === store.getState().authors).toBeTruthy();
    });

    it('Check posts content', () => {
        const wrapper = mount(<Provider store={store}><PostsList/></Provider>);
        const childProps = wrapper.find(PostsList).childAt(0).props();
        expect(childProps.posts === store.getState().posts).toBeTruthy();
    });

});
