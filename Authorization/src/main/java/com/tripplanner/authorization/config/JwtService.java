package com.tripplanner.authorization.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.hibernate.annotations.DialectOverride;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

		private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"; //todo move to env and fix private key
		KeyPair keyPair = Keys.keyPairFor(SignatureAlgorithm.ES256);
		PrivateKey privateKey = keyPair.getPrivate();
		PublicKey publicKey = keyPair.getPublic();
		public String extractUsername(String token) {
				return extractClaim(token, Claims::getSubject);
		}

		public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
				final Claims claims = extractAllClaims(token);
				return claimsResolver.apply(claims);
		}

		public String generateToken(UserDetails userDetails){
			return generateToken(new HashMap<>(), userDetails);
		}

		public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
				return Jwts.builder()
						.setClaims(extraClaims)
						.setSubject(userDetails.getUsername())
						.setIssuedAt(new Date(System.currentTimeMillis()))      // 10 days token
						.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24 * 10))
						.signWith(privateKey)
						.compact();
		}

		public boolean isTokenValid(String token, UserDetails userDetails){
				final String username = extractUsername(token);
				return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
		}

		private boolean isTokenExpired(String token) {
				return extractExpiration(token).before(new Date());
		}

		private Date extractExpiration(String token) {
				return extractClaim(token, Claims::getExpiration);
		}

		private Claims extractAllClaims(String token) {
				return Jwts.parserBuilder().setSigningKey(publicKey).build().parseClaimsJws(token).getBody();
		}

		private Key getSignInKey() {
				byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
				return Keys.hmacShaKeyFor(keyBytes);
		}
}
