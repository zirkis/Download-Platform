import React from 'react';
import {Field, reduxForm, change} from 'redux-form';
import {TextField, AutoComplete} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {fullBlack} from 'material-ui/styles/colors';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import {validate, asyncValidate} from './validations';

const floatingLabelStyle = {
  color: fullBlack
};

@reduxForm({
  form: 'add_link',
  validate,
  asyncValidate,
  asyncBlurFields: ['serieSelected']
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
      dispatch(change('add_link', 'serieSelected', null));
      return;
    }
    dispatch(change('add_link', 'serieSelected', matchingSeries[0]));
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
                 floatingLabelText="Serie to add link"
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
                 floatingLabelText="Episode to add link"
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
            <Field name="host" component={TextField} type="text"
                   floatingLabelText="Name"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="link" component={TextField} type="text"
                   floatingLabelText="Link"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="quality" component={TextField} type="text"
                   floatingLabelText="Quality"
                   floatingLabelStyle={floatingLabelStyle}
                   fullWidth={true}
            />
          </div>
          <div>
            <Field name="language" component={TextField} type="text"
                   floatingLabelText="Language"
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
            label="Create"
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
