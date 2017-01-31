import React from 'react';
import {Field, reduxForm, change} from 'redux-form';
import {AutoComplete, TextField} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {fullBlack} from 'material-ui/styles/colors';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import {validate, asyncValidate} from './validations';

const floatingLabelStyle = {
  color: fullBlack
};

@reduxForm({
  form: 'update_episode',
  validate,
  asyncValidate,
  asyncBlurFields: ['episode']
})
@CSSModules(styles)
class Form extends React.Component {
  setSerieSelected(name) {
    const {dispatch, series} = this.props;
    if (!name || !series || !series.length) {
      return;
    }
    const matchingSeries = series.filter(episode => {
      return episode.name === name;
    });
    if (!matchingSeries || !matchingSeries.length) {
      dispatch(change('update_episode', 'serieSelected', null));
      return;
    }
    dispatch(change('update_episode', 'serieSelected', matchingSeries[0]));
  }
  onNewRequest() {
    const {asyncValidate} = this.props;
    asyncValidate();
  }
  render() {
    const {handleSubmit, serieSelected, episodeSelected, series, episodes} =
      this.props;

    let dataSourceSeries = [],
      dataSourceEpisodes = [];
    if (series) {
      dataSourceSeries = series.map(serie => serie.name);
    }

    if (episodes) {
      dataSourceEpisodes = episodes.map(episode => episode.name);
    }

    return (
      <form onSubmit={handleSubmit} styleName="form">
        <div>
          <Field name="serie" component={AutoComplete} type="text"
                 floatingLabelText="Serie to update"
                 floatingLabelStyle={floatingLabelStyle}
                 fullWidth={true}
                 filter={AutoComplete.caseInsensitiveFilter}
                 dataSource={dataSourceSeries}
                 onNewRequest={name => this.setSerieSelected(name)}
                 onUpdateInput={name => this.setSerieSelected(name)}
          />
        </div>
        {serieSelected &&
        <div>
          <Field name="episode" component={AutoComplete} type="text"
                 floatingLabelText="Episode to update"
                 floatingLabelStyle={floatingLabelStyle}
                 fullWidth={true}
                 filter={AutoComplete.caseInsensitiveFilter}
                 dataSource={dataSourceEpisodes}
                 onNewRequest={() => this.onNewRequest()}
          />
        </div>
        }
        {episodeSelected &&
        <div>
          <div>
            <Field name="name" component={TextField} type="text"
                   floatingLabelText="Name"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="saison" component={TextField} type="number"
                   floatingLabelText="Saison"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="number" component={TextField} type="number"
                   floatingLabelText="Number"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="resume" component={TextField} type="text"
                   floatingLabelText="Resume"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
                   multiLine={true}
                   rows={2}
                   rowsMax={5}
            />
          </div>
        </div>
        }
        <div styleName="button">
          <RaisedButton
            label="Update"
            style={{width: '50%'}}
            backgroundColor="grey"
            type="submit"
          />
        </div>
      </form>
    );
  }
}

export default Form;
