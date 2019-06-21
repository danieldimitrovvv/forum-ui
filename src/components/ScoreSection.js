import React, { Component } from 'react'
import Api from '../services/Api'
import  FontAwesome  from 'react-fontawesome';
import Theme from '../services/Theme';

class ScoreSection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userCurrentReplyScore: null,
      disabled: {
        positive: false,
        negative: false
      },
      scores:{
        positive: 0,
        negative: 0,
        positivePercent: 50
      }
    }

    this.onPositiveScore = this.onPositiveScore.bind(this);
    this.onNegativeScore = this.onNegativeScore.bind(this);
    this.getPosivitePercents = this.getPosivitePercents.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  changeCurrentUserVote = () =>  {
    Api.setInterseptor(this.props)
    .getScoresByReplyIdAndUserId(this.props.reply.id)
    .then((data) => {
      let currentUserVote = data.data[0];
      this.setState({
        userCurrentReplyScore: currentUserVote
      });
    });
  }

  init = () => {
    Api.setInterseptor(this.props)
    .getReplyScoreInfoByReplyId(this.props.reply.id)
    .then((data) => {
      let scoreInfo = data.data;

      this.setState({
        userCurrentReplyScore: scoreInfo.currentUserVote,
        disabled: {
          positive: (scoreInfo.currentUserVote !== null) ? 
                      (scoreInfo.currentUserVote.score === 1) ? true : false 
                      : false,
          negative: (scoreInfo.currentUserVote !== null) ?
                      (scoreInfo.currentUserVote.score === -1) ? true : false
                      : false
        },
        scores:{
          positive: scoreInfo.positiveCount,
          negative: scoreInfo.negativeCount,
          positivePercent: this.getPosivitePercents({
            positive: scoreInfo.positiveCount,
            negative: scoreInfo.negativeCount
          })
        }
      });

    })
  }

  onPositiveScore() {
    if (this.state.disabled.positive) {
      this.deleteScore(1);
      return;
    }

    if (this.state.userCurrentReplyScore === null || this.state.userCurrentReplyScore === undefined) {
      this.addPositiveScore();
    } else {
      this.updatePositiveScore();
    }

    this.changeCurrentUserVote();
  }

  addPositiveScore = () => {
    // add new score
    let score = {
      replyId: this.props.reply.id,
      score: 1
    }

    Api.setInterseptor(this.props)
    .createScore(score)
    .then((data) => {
      this.init();
    });
  }

  updatePositiveScore = () => {
    // get exists score and update score value
    let score = this.state.userCurrentReplyScore;
    score.score = 1;

    Api.setInterseptor(this.props)
    .updateScore(score)
    .then((data) => {
      this.changeVoteState(score.score);
    });
  }

  onNegativeScore() {
    if (this.state.disabled.negative) {
      // delete score
      this.deleteScore(-1);
      return;
    }

    if (this.state.userCurrentReplyScore === null || this.state.userCurrentReplyScore === undefined) {
      this.addNegativeScore();
    } else {
      this.updateNegativeScore();
    }

    this.changeCurrentUserVote();
  }

  addNegativeScore = () => {
    // add new score
    let score = {
      replyId: this.props.reply.id,
      score: -1
    }

    Api.setInterseptor(this.props)
    .createScore(score)
    .then((data) => {
      this.init();
    });
  }

  updateNegativeScore = () => {
    // get exists score and update score value
    let score = this.state.userCurrentReplyScore;
    score.score = -1;

    Api.setInterseptor(this.props)
    .updateScore(score)
    .then((data) => {
      this.changeVoteState(score.score);
    });
  }

  changeVoteState = (score) => {
    let positiveVote = this.state.scores.positive + score;
    let negativeVote = this.state.scores.negative - score;

    let vote = {
      positive: positiveVote,
      negative: negativeVote
    };

    this.setState({
      disabled: {
        positive: (score === 1),
        negative: (score === -1)
      },
      scores: {
        ...vote,
        positivePercent: this.getPosivitePercents(vote)
      }
    });
  }

  deleteScore = (score) => {
    if (this.state.userCurrentReplyScore === null || this.state.userCurrentReplyScore === undefined) {
      return;
    }
    
    Api.setInterseptor(this.props)
    .deleteScoreById(this.state.userCurrentReplyScore.id)
    .then((response) => {
      let positiveVote = this.state.scores.positive; 
      positiveVote -= ((score === 1) ? 1 : 0);

      let negativeVote = this.state.scores.negative;
      negativeVote -= ((score === -1) ? 1 : 0);

      let vote = {
        positive: positiveVote,
        negative: negativeVote
      }
    
      this.setState({
        userCurrentReplyScore: null,
        disabled: {
          positive: false,
          negative: false
        },
        scores:{
          ...vote,
          positivePercent: this.getPosivitePercents(vote)
        }
      });
    });
  }

  getPosivitePercents(scores) {
    if (scores.positive === scores.negative) {
      return 50;
    }

    if (scores.positive === 0) {
      return 0;
    }

    return (scores.positive / (scores.positive + scores.negative)) * 100;
  }

  getThemeClass = () => {
    return Theme.getVoteThemeClass(this.props.theme);
  }

  render () {
    return (
      <div className={this.getThemeClass()} style={{ textAlign: 'center'}}>
        {/* current user vote */}
       
        <div className="current-user-vote-section">
          <FontAwesome
            className={(this.state.disabled.positive) ? 'thumbs-up-fa-icon' : 'thumbs-down-fa-icon'}
            name={(this.state.disabled.positive) ? "thumbs-up" : "thumbs-down"}
            size="4x"
            style={{ 
              display: (this.state.disabled.positive || this.state.disabled.negative) ? 'block' : 'none' 
            }}
            onClick={(this.state.disabled.positive) ? this.onPositiveScore : this.onNegativeScore}
          />
        </div>

        <div 
          style={{
            display: 'inline-block',
            width: '100%',
            height: '100%'
          }}
        >
          <FontAwesome
            name="thumbs-up"
            className="thumbs-up-fa-icon"
            size={(this.state.scores.positive === 0 && this.state.scores.negative === 0)? '4x' : 'lg'}
            style={{ 
              display: this.state.disabled.positive ? 'none' : 'block' 
            }}
            onClick={this.onPositiveScore}
          />
          <div 
            className="progress"
            style={{
              display: (this.state.scores.positive === 0 && this.state.scores.negative === 0) ? 'none' : 'flex'
            }}
          > 
            <div 
              className="progress-bar" 
              style={{ 
                width: this.state.scores.positivePercent + '%',
              }}
              role="progressbar" 
              aria-valuenow={this.state.scores.positivePercent} 
              aria-valuemin="0" 
              aria-valuemax="100">
               {this.state.scores.positive} ({Math.round((this.state.scores.positivePercent) * 100) / 100} %)
            </div>
            <span 
              className="progress-dislike-section"
              style={{
                width: (100 - this.state.scores.positivePercent) + '%',
              }}
            >
              {this.state.scores.negative} ({Math.round((100 - this.state.scores.positivePercent) * 100) / 100} %)
            </span>
          </div>

          <FontAwesome
            className="thumbs-down-fa-icon"
            name="thumbs-down"
            size={(this.state.scores.positive === 0 && this.state.scores.negative === 0)? '4x' : 'lg'}
            style={{
              display: this.state.disabled.negative ? 'none' : 'block',
              float: (this.state.scores.positive === 0 && this.state.scores.negative === 0)? 'right' : 'left'
            }}
            onClick={this.onNegativeScore}
          />
        </div>
        
      </div>
    )
  }
}

export default ScoreSection
