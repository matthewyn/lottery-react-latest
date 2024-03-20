export const paths = {
  home() {
    return "/";
  },
  raffles() {
    return "/raffles";
  },
  raffleDetails(address: string) {
    return `/raffles/${address}`;
  },
};
