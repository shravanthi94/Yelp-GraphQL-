import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getCustomerQuery } from '../../queries/query';
