export default theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  info: {
    marginLeft: 12,
  },
  locationText: {
    marginTop: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  dateText: {
    color: theme.palette.text.secondary
  },
  avatar: {
    height: '110px',
    width: '110px',
    flexShrink: 0,
    flexGrow: 0
  },
  progressWrapper: {
    marginTop: theme.spacing.unit * 2
  },
  uploadButton: {
    marginRight: theme.spacing.unit * 2
  }
});
