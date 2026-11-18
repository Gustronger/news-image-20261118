# The World in One Day — 18 November 2026

One image summing up the world's news of Wednesday 18 November 2026,
built for the make.fun bounty
[Sum up 18 November's world news in one image](https://make.fun/bounty/news-image-20261118).

![The World in One Day — 18 November 2026](entry.png)

## What the image shows

A newspaper front page, drawn as flat vector art (no photos, no AI art):

1. **GULF IN FLAMES** (lead, Middle East) — U.S. jets hit a
   Revolutionary Guard missile site on Qeshm Island; Iran fired drones at
   U.S. targets in Bahrain and Kuwait; an LPG tanker burned near the
   Strait of Hormuz.
2. **KERCH BRIDGE ARCH FALLS** (Europe) — Ukraine brings down a road
   arch of the Kerch Bridge into the strait; traffic suspended.
3. **XI OPENS APEC IN SHENZHEN** (Asia) — China's Xi urges AI
   partnership and free trade, denounces protectionism; Xi–Putin talks
   begin.
4. **DEMOCRATS TAKE ALASKA SENATE SEAT** (United States) — Mary
   Peltola beats Dan Sullivan; Democrats reach 56 seats.
5. **HEALTH** — U.S. loses measles elimination status after 26 years
   (5,400+ cases, 10 deaths); Ebola surges in DR Congo (11,000+ cases,
   5,400 deaths).
6. **KNESSET PICKS KAHANA SPEAKER** (Israel) — Matan Kahana elected
   speaker, handing Netanyahu's opponents the agenda.

The day's news is the morning's news: 18 November was still in progress
when this image was made, so it covers what had happened or been reported
by then.

## How to run

Node 22, standard library only, no network:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
# writes out/entry.png (byte-identical to entry.png in this repo)
```

`main.ts` copies `entry.png` into the output directory and verifies the
copy is whole and still a PNG.

## License

MIT — see [LICENSE](LICENSE).
