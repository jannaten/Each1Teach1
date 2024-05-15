FROM node:18-alpine

COPY server /app
RUN cd /app && \
		yarn && \
		yarn global add migrate-mongoose

COPY frontend /tmp/frontend
RUN cd /tmp/frontend && \
		yarn && \
		yarn build && \
		mkdir -p /app/build/images && \ 
		cp /tmp/frontend/build/*.html /app/build/. && \
		cp /tmp/frontend/build/*.js /app/build/. && \
		cp /tmp/frontend/build/*.gz /app/build/. && \
		cp /tmp/frontend/build/*.css /app/build/. && \
		cp /tmp/frontend/build/images/*.webp /app/build/images/. && \		
		cd /app && \
		rm -rf /tmp && \
		rm -rf /usr/local/share/.cache/yarn

WORKDIR /app

CMD ["yarn", "start"]

# Production
# docker build . -t registry.eduix.fi/library/eduplanella-app:$(git rev-list HEAD --count)
# docker push registry.eduix.fi/library/eduplanella-app:$(git rev-list HEAD --count)

# Staging
# docker build . -t registry.eduix.fi/library/eduplanella-app:stg-$(git rev-list HEAD --count)-stg
# docker push registry.eduix.fi/library/eduplanella-app:$(git rev-list HEAD --count)-stg