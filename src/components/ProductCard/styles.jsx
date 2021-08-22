export default theme => ({
  root: {
    maxWidth: '100%',
    // paddingTop: theme.spacing.unit * 3,
    // paddingBottom: theme.spacing.unit * 2,
    // paddingRight: theme.spacing.unit * 3,
    // paddingLeft: theme.spacing.unit * 3
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    maxWidth: "100%",
    margin: '0 auto',
    border: '1px solid #EDF0F2',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  details: {},
  title: {
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  },
  description: {
    lineHeight: '16px',
    height: theme.spacing.unit * 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit * 2
  },
  description2: {
    textAlign: "justify",
    lineHeight: '16px',
    minHeight: theme.spacing.unit * 4,
    maxHeight: theme.spacing.unit * 24,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: 20,
    paddingRight: 20,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit
  },
  updateIcon: {
    color: theme.palette.text.secondary
  },
  updateText: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  downloadsIcon: {
    marginLeft: 'auto',
    color: theme.palette.text.secondary
  },
  downloadsText: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary
  }
});
