export function getRank(name: string) {
  const rankRegEx = /(PV2|PVT|PFC|SPC|CPL|SGT|SSG|SFC|MSG|1SG|SGM|CSM|W01|CW2|CW3|CW4|CW5|2LT|1LT|CPT|MAJ|LTC|COL|BG|MG|LTG|GEN|GA)/ig;

  const rank = rankRegEx.exec(name);

  if (rank === null) {
    return '';
  }

  return rank[0];
}

export function isDotMilEmail(email: string) {
  return email.endsWith('.mil');
}
