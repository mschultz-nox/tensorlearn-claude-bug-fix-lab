import test from 'node:test';
import assert from 'node:assert/strict';
import { getClaim } from '../../src/claims.mjs';

// Incident: viewer user-4 received claim-B, owned by user-42, because ownership
// was checked with a prefix match. Owners with overlapping IDs must stay separate.
test('viewer user-4 cannot receive claim-B owned by user-42', () => {
  const claims = [
    { id: 'claim-A', ownerId: 'user-4', status: 'open' },
    { id: 'claim-B', ownerId: 'user-42', status: 'approved' },
  ];

  assert.equal(getClaim(claims, 'user-4', 'claim-B'), null, 'user-4 must not receive claim-B');
  assert.equal(getClaim(claims, 'user-42', 'claim-B'), claims[1]);
  assert.equal(getClaim(claims, 'user-4', 'claim-A'), claims[0]);
});
