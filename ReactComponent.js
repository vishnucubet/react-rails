import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import cookie from 'react-cookies';
import {notify} from 'react-notify-toast';
import { setSpeakerId, setTopic } from '../actions';
import { topics, langs } from './constants';
import { getSelectedSpeaker, getAllSpeakers } from './selectors';
import fAvatar from '../assets/images/f-avatar.jpg';
import mAvatar from '../assets/images/m-avatar.jpg';
import Rowohlt from '../assets/images/Rowohlt_logo.jpg';
import Kiepenheur from '../assets/images/kiepenheur.png';
import Dachmarken from '../assets/images/Dachmarken-Signet.jpg';
import Droemer from '../assets/images/droemer_logo.jpg';


class ViewSpeaker extends Component {
  constructor(props) {
    super(props);
    const wishLists = cookie.load('myWishes') ? cookie.load('myWishes') : [];
    const index = props.allSpeakers ? props.allSpeakers.findIndex((speaker) => speaker.id === props.speaker.id): 0;
    this.state = {
      id: props.speaker? props.speaker.id :'',
      name: props.speaker? props.speaker.name :'',
      surname: props.speaker && props.speaker.surname ? props.speaker.surname :'',
      gender: props.speaker && props.speaker.gender? props.speaker.gender :'male',
      description: props.speaker && props.speaker.description ? props.speaker.description :'',
      publisher: props.speaker && props.speaker.publisher ? props.speaker.publisher :'',
      plogo: props.speaker && props.speaker.plogo ? props.speaker.plogo :'',
      langs: props.speaker && props.speaker.languages? props.speaker.languages[0] :{},
      topic: props.speaker && props.speaker.topic? props.speaker.topic[0] :{},
      publications: props.speaker && props.speaker.publicationses? props.speaker.publicationses : [],
      audios: props.speaker && props.speaker.audios? props.speaker.audios : [],
      videos: props.speaker && props.speaker.videos? props.speaker.videos : [],
      imageUrl: props.speaker && props.speaker.imageurl1 ? props.speaker.imageurl1 :'',
      index: index ? index : 0,
      wishLists: wishLists,
    }
  }
  componentWillMount() {
    window.scrollTo(0,0);
  }
  componentDidMount() {
    if(!this.props.allSpeakers){
      this.props.history.push(`/`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.speaker !== nextProps.speaker){
      const props = nextProps;
      const wishLists = cookie.load('myWishes') ? cookie.load('myWishes') : [];
      this.setState({
        id: props.speaker? props.speaker.id :'',
        name: props.speaker? props.speaker.name :'',
        surname: props.speaker && props.speaker.surname ? props.speaker.surname :'',
        gender: props.speaker && props.speaker.gender? props.speaker.gender :'male',
        description: props.speaker && props.speaker.description ? props.speaker.description :'',
        publisher: props.speaker && props.speaker.publisher ? props.speaker.publisher :'',
        plogo: props.speaker && props.speaker.plogo ? props.speaker.plogo :'',
        langs: props.speaker && props.speaker.languages? props.speaker.languages[0] :{},
        topic: props.speaker && props.speaker.topic? props.speaker.topic[0] :{},
        publications: props.speaker && props.speaker.publicationses? props.speaker.publicationses : [],
        audios: props.speaker && props.speaker.audios? props.speaker.audios : [],
        videos: props.speaker && props.speaker.videos? props.speaker.videos : [],
        imageUrl: props.speaker && props.speaker.imageurl1 ? props.speaker.imageurl1 :'',
        wishLists: wishLists,
      })

    }
  }

  render() {

    const { speaker } = this.props;

    let topicsSelected = [];
    let langSelected = [];

    this.state.topic && Object.keys(this.state.topic).map((topic) => {
      let sel = false;
      if(this.state.topic[topic] === true){
        sel = topics.find(genre => genre.id === topic);
        topicsSelected.push({
          id:sel.id,
          title:sel.text
        });
      }
    });

    this.state.langs && Object.keys(this.state.langs).map((lang) => {
      let langSel = false;
      if(this.state.langs[lang] === true){
        langSel = langs.find(language => language.id === lang);
        langSelected.push(langSel.text);
      }
    });

    // showing languages selected
    langSelected = langSelected.join(', ');

    let avatar = fAvatar;

    // showing default avatar images
    if(this.state.imageUrl){
      avatar = this.state.imageUrl;
    }else if (this.state.imageUrl === '' && this.state.gender === 'male') {
      avatar = mAvatar;
    }

    return (
      <section className="content-container speaker-details-cntr">
      <div className="speakers-head">
      <ul className="clearfix">
      <li>{this.state.wishLists.length === 0 && <Link to="/wishlist" onClick={(e) => this._askThisSpeaker(e, speaker)}>Nur diesen Speaker anfragen</Link>}</li>
      <li>
      { this._isFav(speaker) ? `` :
        <a href="#" onClick={(e) => this._addToWishList(e, speaker)}>Auf die Wishlist</a>
      }
      </li>
      </ul>
      </div>
      <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner" role="listbox">
      <div className="item clearfix active">
      <div className="col-md-6 left-cntr">
      <figure className="mob">
      <img src={avatar} className="img-responsive" alt="" />
      </figure>
      <div className="cnt">
      <h1>{`${this.state.name} ${this.state.surname}`}</h1>
      <p>
      {this.state.description}
      </p>
      </div>
      <div className="show-details">
      { topicsSelected && <div> <span className="info-txt">Topics</span>
      <ul className="clearfix">
      <li className="topic-list">
      { topicsSelected && topicsSelected.map((topic, key) =>
        <a key={key} href="#" onClick={(e) => this._setTopic(e, topic.id)}>{`#${topic.title} `}</a>
      )}</li>
      </ul></div> }
      {langSelected && <div> <span className="info-txt">Sprachen</span>
      <ul className="clearfix">
      <li>{langSelected}</li>
      </ul> </div>}

      {this.state.plogo && <div> <span className="info-txt">Logo</span>
      <ul className="clearfix">
      <li><img src={this._setLogo(this.state.plogo)} alt="" className="logo-img" /></li>
      </ul> </div>}

      </div>
      </div>
      <div className="col-md-6 right-cntr">
      <figure className="web">
      <img src={avatar} className="img-responsive" alt="" />
      </figure>
      <div className="video-details">
      {this.state.videos && this.state.videos.length > 0 &&
        <div> <span className="info-txt">Video Material</span>
        <ul className="clearfix">
        { this.state.videos.map((video, vIndex) =>
          <li key={vIndex}><a href={video.url} target="_blank">{video.name}</a><span>{video.source}</span></li>
        )}
        </ul> </div> }
        {this.state.audios && this.state.audios.length > 0 &&
          <div> <span className="info-txt">Podcasts</span>
          <ul className="clearfix">
          { this.state.audios.map((audio, aIndex) =>
            <li key={aIndex}><a href={audio.url} target="_blank">{audio.name}</a><span>{audio.source}</span></li>
          )}
          </ul> </div> }
          {this.state.publications && this.state.publications.length > 0 &&
            <div> <span className="info-txt">Publikationen</span>
            <ul className="clearfix">
            { this.state.publications.map((publication, index) =>
              <li key={index}><a href={publication.url} target="_blank">{publication.name}</a><span>{publication.source}</span></li>
            )}
            </ul>
            </div> }
            </div>
            </div>
            </div>
            </div>
            { this.state.index > 0 &&
              <a onClick={(e) => this._prev(e, this.state.index)} className="left carousel-control"
              href="#carousel-example-generic" role="button" data-slide="prev">
              <span className="sprite-left"></span>
              </a>
            }
            { this.state.index <  this.props.allSpeakers.length -1 &&
              <a onClick={(e) => this._next(e, this.state.index)} className="right carousel-control"
              href="#carousel-example-generic" role="button" data-slide="next">
              <span className="sprite-right"></span>
              </a>
            }
            </div>
            </section>
          );
        }

        // Set the topi for filtering
        _setTopic = (e, topic) =>{
          e.preventDefault();
          this.props.setTopic(topic);
          this.props.history.push(`/`);
        }

        _setLogo = (logo) => {
          let pLogo = Rowohlt;
          switch (logo){
            case 'kiepenheur' : pLogo = Kiepenheur;
            break;
            case 'dachmarken' : pLogo = Dachmarken;
            break;
            case 'droemer' : pLogo = Droemer;
            break;
          }
          return pLogo;
        }

        // Navigating to the next speaker
        _next = (e, currentIndex) => {
          e.preventDefault();
          const currIndex = currentIndex + 1;
          const speaker = this.props.allSpeakers[currIndex];
          this.props.setSpeakerId(speaker.id);
          this.setState({index: currIndex});

        }

        // Navigating to the previous speaker
        _prev = (e, currentIndex) => {
          e.preventDefault();
          const currIndex = currentIndex - 1;
          const speaker = this.props.allSpeakers[currIndex];
          this.props.setSpeakerId(speaker.id);
          this.setState({index: currIndex});
        }

        // mark the speaker as favorite
        _isFav = (speaker) => {
          const wishList = cookie.load('myWishes') ? cookie.load('myWishes') : [];
          const item = wishList.find((fav) =>
          fav.id === speaker.id
        );
        if(item){
          return true;
        }else {
          return false;
        }
      }

      _askThisSpeaker = (e, speaker) => {
        const spInfo = {
          id: speaker.id,
          name: speaker.name,
          surname: speaker.surname,
          imgUrl: speaker.imageurl1,
        };
        const wishList = cookie.load('myWishes') ? cookie.load('myWishes') : [];
        wishList.push(spInfo);
        this.setState({wishLists: wishList});
        cookie.save('myWishes', wishList, { path: '/' });
      }

      // adding the speaker to the wishList
      _addToWishList = (e, speaker) => {
        e.preventDefault();
        const spInfo = {
          id: speaker.id,
          name: speaker.name,
          surname: speaker.surname,
          imgUrl: speaker.imageurl1,
        };
        const wishList = cookie.load('myWishes') ? cookie.load('myWishes') : [];
        wishList.push(spInfo);
        this.setState({wishLists: wishList});
        cookie.save('myWishes', wishList, { path: '/' });
        e.target.style.display = "none";
        notify.show('Speaker zur Wunschliste hinzugefügt', 'success', 5000);
      }
    }

    const mapStateToProps = createStructuredSelector({
      speaker: getSelectedSpeaker(),
      allSpeakers: getAllSpeakers(),
    });

    const mapDispatchToProps = (dispatch) => {
      return {
        setSpeakerId: (id) => dispatch(setSpeakerId(id)),
        setTopic: (topic) => dispatch(setTopic(topic)),
      };
    };
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewSpeaker));
