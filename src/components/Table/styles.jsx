export default theme => ({
  root: {},
  tableRow: {
    height: '64px'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 2,
    fontWeight: 500,
    cursor: 'pointer'
  },
  customerCell: {
    maxWidth: '200px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 500
  },
  statusWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing.unit
  }
});
