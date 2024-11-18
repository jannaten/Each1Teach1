function getEmailDomainRegex(allowedDomains) {
  const domainRegex = allowedDomains
    .map((domain) => domain.replace('.', '\\.'))
    .join('|');
  return new RegExp(`@(${domainRegex})$`);
}

const formatDomainList = (domains) => {
  return domains
    .map((domain) => `@${domain}`)
    .sort()
    .join(', ');
};

module.exports = {
  getEmailDomainRegex,
  formatDomainList
};
