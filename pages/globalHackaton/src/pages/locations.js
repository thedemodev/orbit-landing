// @flow

import React from 'react';
import './reset.css';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

// Components
import Grid from '@kiwicom/orbit-components/lib/utils/Grid';
import OrbitLanding from '@kiwicom/orbit-landing-components/src/OrbitLanding';
import LocationCard from '@kiwicom/orbit-landing-components/src/LocationsCard';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import TextLink from '@kiwicom/orbit-components/lib/TextLink';
import Contact from '@kiwicom/orbit-landing-components/src/Contact';
import NavBar from '@kiwicom/orbit-landing-components/src/NavBar';
import Locations from '@kiwicom/orbit-landing-components/src/Locations';

import Footer from '../components/Footer';
import Seo from '../components/seo';
import heroPattern from '../images/pattern04.svg';

// Images
const StyledWrapper = styled.div`
  background-color: #f5f7f9;
  width: 100%;
  height: auto;
  max-width: 1920px;
  padding: calc(1rem + 3vw) calc(1rem + 7.02vw) calc(1rem + 7.02vw);
  box-sizing: border-box;
`;

const StyledNavBarWrapper = styled.div`
  background-color: #000;
  padding: 3rem 0 0;
`;

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query locationsAllPosts {
      allPrismicLocations {
        nodes {
          id
          uid
          data {
            display_on_website
            logo {
              url
            }
            location_country {
              text
            }
            location_city {
              text
            }
            link_to_event {
              url
            }
          }
        }
      }
    }
  `);

  const locationList = data.allPrismicLocations.nodes
    .filter(el => el.data.display_on_website !== 'false')
    .map(el => {
      return {
        id: el.id,
        internalHref: `/${el.uid}`,
        href: el.data.link_to_event && el.data.link_to_event.url,
        location: el.data.location_city.text,
        eventName: el.data.location_country.text,
        logo: el.data.logo.url,
      };
    });

  return (
    <OrbitLanding>
      <>
        <Seo title="Locations of global hackathon by Kiwi.com" />
        <StyledNavBarWrapper>
          <NavBar
            title="#HackTravel"
            homeLink="/"
            items={[
              {
                title: 'About',
                href: '/#about',
              },
              {
                title: 'Prizes',
                href: '/#prizes',
              },
              {
                title: 'FAQ',
                href: '/#faq',
              },
              {
                title: 'Contact',
                href: '/#contact',
              },
            ]}
          />
        </StyledNavBarWrapper>
        <Locations
          id="locations"
          title="Register to one of Global Travel Hackathon events on 27 September"
          pattern={heroPattern}
          suppressed
        />
        <StyledWrapper>
          <Stack spacing="loose">
            <Heading type="title4" element="h2">
              Choose event you want to attend
            </Heading>
            <Grid
              columns="repeat(1, 1fr)"
              gap="2vw"
              largeMobile={{ columns: 'repeat(2, 1fr)' }}
              tablet={{ columns: 'repeat(3, 1fr)' }}
              desktop={{ columns: 'repeat(4, 1fr)' }}
            >
              {locationList.map((el, i) => {
                return (
                  <LocationCard
                    condensed
                    inverted
                    key={el.location + i}
                    href={el.href ? el.href : el.internalHref}
                    external
                    eventName={el.eventName}
                    location={el.location}
                    logo={el.logo}
                  />
                );
              })}
            </Grid>
          </Stack>
        </StyledWrapper>
        <Contact
          id="contact"
          title="Contact"
          leftSectionHeading="Questions"
          leftSectionDescription={
            <>
              Do you have a question, an idea or another request? Don’t hesitate
              to drop us a line at{' '}
              <TextLink href="mailto:globalhack@kiwi.com">
                globalhack@kiwi.com
              </TextLink>
              .
            </>
          }
          rightSectionHeading="Get involved"
          rightSectionDescription={
            <>
              Do you want to join us as a Global Hackathon Ambassador, Partner
              or Volunteer? Shoot us an e-mail at{' '}
              <TextLink href="mailto:globalhack@kiwi.com">
                globalhack@kiwi.com
              </TextLink>
              .
            </>
          }
        />
        <Footer />
      </>
    </OrbitLanding>
  );
};

export default IndexPage;
